from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    series = db.Column(db.String(80))
    set = db.Column(db.String(80))
    price_purchased = db.Column(db.Float)
    date_acquired = db.Column(db.DateTime, default=datetime.utcnow)
    image_filename = db.Column(db.String(200))

    def __repr__(self):
        return f"<Card {self.name}>"