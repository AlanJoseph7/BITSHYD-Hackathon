from flask import Flask, request, jsonify
from google.cloud import storage
from flask_cors import CORS
import datetime
from google.cloud import storage

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:\\Users\\Dell\\OneDrive\\Desktop\\GCP Hackathon Full Stack\\BITSHYD-Hackathon\\bitshackathon-454516-a221a415869d.json"


storage_client = storage.Client()


app = Flask(__name__)  
CORS(app)

storage_client = storage.Client()
bucket_name = "school-secure-bucket"

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(file.filename)
    blob.upload_from_file(file.stream) 
    return jsonify({"message": "File uploaded successfully!"})

@app.route('/generate-url', methods=['GET'])
def generate_signed_url():
    filename = request.args.get('filename')
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(filename)
    url = blob.generate_signed_url(
        expiration=datetime.timedelta(minutes=10),
        method="GET"
    )
    return jsonify({"signed_url": url})

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/favicon.ico')
def favicon():
    return '', 204  # Empty response with status 204 (No Content)
