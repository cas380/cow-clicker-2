#!/bin/bash

# Create and enable a virtual environment
if [ ! -d "venv" ]; then
	python3 -m venv venv
fi
source venv/bin/activate

# All of these commands will run in venv
pip install -r requirements.txt
python3 main.py