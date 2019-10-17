#from flask import Flask,redirect, render_template
import json
from pprint import pprint
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

app = Flask(__name__)

@app.route("/")
def build():
    return render_template("index.html")


@app.route("/api/incidents")
def incidentdata():
    incidents = [
        {
            "location": [29.61469,-95.217551],
            "time": "10/16/2019 13:47",
            "type":"TRAFFIC HAZARD/NON URGENT",
            "address": "11400 FUQUA ST"
        },
                {
            "location": [29.788847,-95.465122],
            "time": "10/16/2019 14:40",
            "type":"CRASH/MAJOR/NON FATAL",
            "address": "1118 SILBER RD"
        },
                {
            "location": [29.705745,-95.455469],
            "time": "10/16/2019 13:47",
            "type":"TRAFFIC HAZARD/NON URGENT",
            "address": "7500 BELLAIRE BLVD"
        },
                {
            "location": [29.871031,-95.351936],
            "time": "10/16/2019 13:13",
            "type":"TRAFFIC HAZARD/NON URGENT",
            "address": "19798 ALDINE WESTFIELD RD"
        },
        {
            "location": [29.8414568627451,-95.4991699019608],
            "time": "10/16/2019 12:38",
            "type":"CRASH/MAJOR/NON FATAL",
            "address": "13098 COOPERS HAWK DR"
        },
        {
            "location": [29.856015,-95.472975],
            "time": "October 14, 2019",
            "type":"Shooting",
            "address": "704 Greens Road",
        },
        {
            "location": [29.693009,-95.496706],
            "time": "October 14, 2019",
            "type":"Sexual Assault",
            "address": "11303 Bissonnet Street",
        },
        {
            "location": [29.693009,-95.496706],
            "time": "October 14, 2019",
            "type":"Sexual Assault",
            "address": "11303 Bissonnet Street",
        },
                {
            "location": [29.693009,-95.496706],
            "time": "October 14, 2019",
            "type":"Sexual Assault",
            "address": "11303 Bissonnet Street",
        },
                {
            "location": [29.1293009,-95.496706],
            "time": "October 14, 2019",
            "type":"Sexual Assault",
            "address": "11303 Bissonnet Street",
        },
                {
            "location": [29.193009,-95.496706],
            "time": "October 14, 2019",
            "type":"Sexual Assault",
            "address": "11303 Bissonnet Street",
        },
        {
            "location": [29.613009,-95.496706],
            "time": "October 14, 2019",
            "type":"Sexual Assault",
            "address": "11303 Bissonnet Street",
        }
    ]
    pprint(incidents)
    return json.dumps(incidents)
    
if __name__ == "__main__":
    app.run()