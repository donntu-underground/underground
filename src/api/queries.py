import psycopg2
from src.config import DB_CONFIG
import json
from collections import defaultdict


def connect_db():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except psycopg2.Error as _:
        raise psycopg2.Error("Ошибка подключения к базе!")


async def call_func(func_name: str, *args):
    conn = None
    cursor = None
    try:
        conn = connect_db()
        if not conn:
            return None

        cursor = conn.cursor()
        query: str = f'SELECT * FROM {func_name}(' + ','.join(['%s' for _ in range(len(args))]) + ')'
        cursor.execute(query, args)
        result_set: dict = cursor.fetchall()[0][0]
        conn.commit()
        cursor.close()
        conn.close()
    except psycopg2.Error as e:
        if conn:
            conn.rollback()
        raise psycopg2.Error(f"{e.pgerror.splitlines()[0]}")

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

    return result_set
