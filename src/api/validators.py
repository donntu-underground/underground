from pydantic import BaseModel, Field, field_validator


class LoginData(BaseModel):  # данные логина
    email: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=256, max_length=256)


class RegData(BaseModel):  # данные регистрации
    first_name: str = Field(..., min_length=1, max_length=50)
    name: str = Field(..., min_length=1, max_length=50)
    patronymic: str = Field(...,)
    email: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=256, max_length=256)
    secret_word: str = Field(..., min_length=1, max_length=50)
