from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Simulated database
actions = []
users = {}

@app.route('/')
def index():
    return render_template('admin.html')

@app.route('/save-action', methods=['POST'])
def save_action():
    data = request.json
    user_id = data.get('userId')
    coins = data.get('coins')
    
    if user_id in users:
        users[user_id]['coins'] = coins
    else:
        users[user_id] = {'coins': coins}
    
    actions.append(data)
    return jsonify({"status": "success", "message": "Action saved"}), 200

@app.route('/get-actions', methods=['GET'])
def get_actions():
    return jsonify(actions), 200

@app.route('/get-users', methods=['GET'])
def get_users():
    return jsonify(users), 200

if __name__ == '__main__':
    app.run(debug=True)
