import pymysql

def mysql_connection(y_pred_dict):
    # MySql 연결 설정
    connection = pymysql.connect(
        host='localhost',
        user='fireants',
        password='tiger',
        database='coinproject'
    )

    # 커서 생성
    cursor = connection.cursor()

    # 데이터 삽입 쿼리
    sql = "INSERT INTO predictions (trade_date, prediction, probability) VALUES (%s, %s, %s)"

    # 데이터 삽입 실행
    cursor.execute(sql, (y_pred_dict['trade_date'][0], y_pred_dict['prediction'][0], y_pred_dict['probability']))

    # 변경 사항 저장
    connection.commit()

    # 연결 종료
    cursor.close()
    connection.close()

    return connection
