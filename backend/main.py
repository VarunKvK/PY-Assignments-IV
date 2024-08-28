from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///cafes.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)

class Cafe(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),nullable=False)
    location=db.Column(db.String(200),nullable=False)
    wifi=db.Column(db.Boolean,default=False)
    power=db.Column(db.Boolean,default=False)
    image=db.Column(db.String,nullable=False)


with app.app_context():
    db.create_all()
    
    
@app.route("/cafe",methods=["GET"])
def get_cafes():
    cafes= Cafe.query.all()
    return jsonify([{
        'id':cafe.id,
        'name':cafe.name,
        'location':cafe.location,
        'wifi':cafe.wifi,
        'power':cafe.power,
        'image':cafe.image
    }for cafe in cafes])
    
@app.route("/cafe",methods=["POST"])
def add_cafe():
    data=request.json
    new_cafe=Cafe(name=data['coffeePlace'],location=data['location'],wifi=data['wifi'],power=data['power'],image=data['image'])
    db.session.add(new_cafe)
    db.session.commit()
    return jsonify({"message":"Successfully got the cafe"}),200



if __name__=="__main__":
    app.run(debug=True)
