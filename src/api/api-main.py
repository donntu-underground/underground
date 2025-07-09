import psycopg2
from fastapi.exceptions import RequestValidationError

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

from starlette.requests import Request

from src.api.validators import RegData, LoginData

app = FastAPI(debug=True)


@app.get("/underground/")
async def underground():
    return JSONResponse({"message": "Hello World"})


@app.post("/underground/sign-up")
async def underground(new_user: RegData):
    print("Отправляем сообщение с фио старосте, дальше его не передаём в базу")

    return JSONResponse({"message": "Registration Successful"})


@app.post("/underground/sign-in")
async def underground(user_data: LoginData):
    return JSONResponse({"message": "Login Successful"})
