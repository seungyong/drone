from flask import Flask, render_template, request, jsonify

from models.tello_command import TelloCommand

app = Flask(__name__, template_folder='./templates', static_folder='./static')
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/command/", methods=["GET", "POST"])
def command():
    tello = TelloCommand()
    
    cmd = request.form.get('command')
    print(tello.get_battery())
    
    try:
        if cmd == 'takeoff':
            tello.take_off()
        if cmd == 'land':
            tello.land()
    except Exception as e:
        print(e)

    return jsonify(status="Success"), 200

if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)