import random
import datetime


def rand_percent(percent: float) -> bool:
    return random.random() < percent


def rand_date(left: datetime.date, right: datetime.date) -> datetime.date:
    delta = right - left
    shift = random.randint(0, delta.days)
    return left + datetime.timedelta(days=shift)


def rand_time() -> datetime.time:
    hour = random.randint(0, 23)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return datetime.time(hour=hour, minute=minute, second=second)


def rand_dates(left: datetime.date, right: datetime.date, count: int) -> list:
    return [rand_date(left, right) for _ in range(count)]


def rand_choices(total: int, iterate: float, none: float) -> list or None:
    if rand_percent(none):
        return None
    percent, result = 1, set()
    while rand_percent(percent):
        percent *= iterate
        for i in range(10):
            choice = random.randint(1, total)
            if choice not in result:
                result.add(choice)
                break
    return list(result)


def rand_tag(total: int, iterate: float, none: float) -> list or None:
    result = rand_choices(total, iterate, none)
    return result if result is None else list(map(lambda x: 'Tag' + str(x), result))


def rand_category(total: int, iterate: float, none: float) -> list or None:
    result = rand_choices(total, iterate, none)
    return result if result is None else list(map(lambda x: 'Category' + str(x), result))


def rand_char(upper: bool) -> str:
    result = random.choice([chr(ord('a') + i) for i in range(0, 26)])
    return result.upper() if upper else result


def rand_word(left: int, right: int, upper: bool) -> str:
    count = random.randint(left, right)
    rest = ''.join([rand_char(False) for _ in range(0, count - 1)])
    return rand_char(upper) + rest


def rand_title(left: int, right: int, iterate: float) -> str:
    percent, result = 1, [rand_word(left, right, True), rand_word(left, right, False)]
    while rand_percent(percent):
        percent *= iterate
        result.append(rand_word(left, right, False))
    return ' '.join(result)


def rand_sentence(left: int, right: int) -> str:
    count = random.randint(50, 150)
    result = [rand_word(left, right, True), *[rand_word(left, right, False) for _ in range(0, count - 1)]]
    return ' '.join(result) + '.'


def rand_paragraph(w_left: int, w_right: int, w_iterate: float, p_left: int, p_right: int) -> str:
    result = ['## ' + rand_title(w_left, w_right, w_iterate), '']
    for i in range(0, random.randint(p_left, p_right)):
        result.append(rand_sentence(w_left, w_right))
        result.append('')
    return '\n'.join(result)


def rand_paragraphs(w_left: int, w_right: int, w_iterate: float, p_left: int, p_right: int, p_iterate: float) -> str:
    percent, result = 1, []
    while rand_percent(percent):
        percent *= p_iterate
        result.append(rand_paragraph(w_left, w_right, w_iterate, p_left, p_right))
    return '\n'.join(result)
