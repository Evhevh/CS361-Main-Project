from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from models import db, Card
import os
import logging
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure the database from environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()

# GET all cards
@app.route('/api/cards', methods=['GET'])
def get_cards():
    cards = db.session.execute(db.select(Card)).scalars().all()
    return jsonify([
        {
            'id': card.id,
            'name': card.name,
            'series': card.series,
            'set': card.set,
            'price_purchased': card.price_purchased,
            'date_acquired': card.date_acquired.isoformat() if card.date_acquired else None,
            'image_filename': card.image_filename,
            'image_url': f'/images/{card.image_filename}' if card.image_filename else None
        } for card in cards
    ])

# GET a specific card by ID
@app.route('/api/cards/<int:card_id>', methods=['GET'])
def get_card(card_id):
    card = db.session.get(Card, card_id)
    if card:
        return jsonify({
            'id': card.id,
            'name': card.name,
            'series': card.series,
            'set': card.set,
            'price_purchased': card.price_purchased,
            'date_acquired': card.date_acquired.isoformat() if card.date_acquired else None,
            'image_filename': card.image_filename,
            'image_url': f'/images/{card.image_filename}' if card.image_filename else None
        })
    return jsonify({"message": "Card not found"}), 404

# POST a new card
@app.route('/api/cards', methods=['POST'])
def add_card():
    data = request.get_json()
    if not data or 'name' not in data or 'image_filename' not in data:
        return jsonify({"message": "Please provide name and image_filename"}), 400

    new_card = Card(
        name=data['name'],
        series=data.get('series'),
        set=data.get('set'),
        price_purchased=data.get('price_purchased'),
        date_acquired=data.get('date_acquired'),
        image_filename=data['image_filename']
    )
    db.session.add(new_card)
    db.session.commit()
    return jsonify({
        'id': new_card.id,
        'name': new_card.name,
        'series': new_card.series,
        'set': new_card.set,
        'price_purchased': new_card.price_purchased,
        'date_acquired': new_card.date_acquired.isoformat() if new_card.date_acquired else None,
        'image_filename': new_card.image_filename,
        'image_url': f'/images/{new_card.image_filename}' if new_card.image_filename else None
    }), 201

# PUT (update) an existing card
@app.route('/api/cards/<int:card_id>', methods=['PUT'])
def update_card(card_id):
    card = db.session.get(Card, card_id)
    if not card:
        return jsonify({"message": "Card not found"}), 404

    data = request.get_json()
    if data.get('name'):
        card.name = data['name']
    if data.get('series'):
        card.series = data['series']
    if data.get('set'):
        card.set = data['set']
    if data.get('price_purchased'):
        card.price_purchased = data['price_purchased']
    if data.get('date_acquired'):
        card.date_acquired = data['date_acquired']
    if data.get('image_filename'):
        card.image_filename = data['image_filename']

    db.session.commit()
    return jsonify({
        'id': card.id,
        'name': card.name,
        'series': card.series,
        'set': card.set,
        'price_purchased': card.price_purchased,
        'date_acquired': card.date_acquired.isoformat() if card.date_acquired else None,
        'image_filename': card.image_filename,
        'image_url': f'/images/{card.image_filename}' if card.image_filename else None 
    })

# DELETE route to delete a card by ID
@app.route('/api/cards/<int:card_id>', methods=['DELETE'])
def delete_card(card_id):
    try:
        card = Card.query.get(card_id)
        if card:
            db.session.delete(card)
            db.session.commit()
            return '', 204
        else:
            return jsonify({'message': 'Card not found'}), 404
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error deleting card ID {card_id}: {e}")
        return jsonify({'message': 'Failed to delete card'}), 500
    
#Serves static images
@app.route('/images/<filename>')
def get_image(filename):
    return send_from_directory(os.path.join(app.root_path, 'static', 'card_images'), filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    