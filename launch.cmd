:: Create and enable a virtual environment
if not exist "venv" (
	python -m venv venv
)
call .\venv\Scripts\activate

:: All of these commands will run in venv
pip install -r requirements.txt
python main.py
pause