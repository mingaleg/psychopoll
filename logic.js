questions = {
    'Сколько человек разработало алгоритм Фарах - Колтона - Бендера?': {
        'Три': {'A': -2, 'B': 0, 'C': 1, 'D': 2, 'P': 0},
        'Два': {'A': 1, 'B': 0, 'C': 0, 'D': -1, 'P': 0},
        'А какая разница?': {'A': 0, 'B': 0, 'C': 1, 'D': 0, 'P': 1},
        'Впервые слышу о таком алгоритме': {'A': -2, 'B': -1, 'C': 0, 'D': 0, 'P': 0},
    },
    'Какая вечёрка лучше?': {
        'Кефир': {'A': 1, 'B': 1, 'C': 0, 'D': -1, 'P': 0},
        'Ряженка': {'A': 2, 'B': 1, 'C': -1, 'D': -1, 'P': 0},
        'Снежок': {'A': -2, 'B': -1, 'C': 0, 'D': 3, 'P': -1},
        'Кофе': {'A': 0, 'B': 0, 'C': 0, 'D': -1, 'P': 2},
    },
    'Каким языком программирования вы чаще пользуетесь?': {
        'Python': {'A': -1, 'B': -1, 'C': 1, 'D': 1, 'P': 2},
        'C++': {'A': 2, 'B': 1, 'C': 1, 'D': -2, 'P': 0},
        'Pascal': {'A': -1, 'B': 1, 'C': -1, 'D': 0, 'P': 0},
        'Java': {'A': 2, 'B': 1, 'C': -1, 'D': -2, 'P': 1},
    },
    'Правда ли, что сортировка слиянием работает за O(N*N)?': {
        'Да': {'A': 3, 'B': 1, 'C': -1, 'D': 0, 'P': 0},
        'Нет': {'A': 0, 'B': 1, 'C': 0, 'D': 0, 'P': 0},
        'Сортировка, простите, чем?': {'A': -10, 'B': -10, 'C': -1, 'D': 3, 'P': -5},
        'Плевать, докупим ещё серверов': {'A': -2, 'B': -2, 'C': -2, 'D': 0, 'P': 1},
    },
    'За какую роль интереснее всего играть в мафию?': {
        'Мирный житель': {'A': 2, 'B': 1, 'C': 0, 'D': -1, 'P': 0},
        'Мафия': {'A': 1, 'B': 0, 'C': 1, 'D': 2, 'P': 0},
        'Комиссар': {},
        'Адвокат': {'P': 1},
    },
    'Сколько раз вы отжались за эту смену?': {
        'Не больше десяти': {'A': 1, 'B': 1, 'C': 1, 'D': 1, 'P': -1},
        'Больше десяти': {'A': -1, 'B': -1, 'C': -1, 'D': -1, 'P': 1},
        '': {},
        '': {},
    },
    'Какое вечернее мероприятие вам больше по душе?': {
        'Костёр': {'A': 1, 'B': 1},
        'Интеллектуальная игра': {'B': 1, 'C': 1},
        'Киноклуб': {'C': 1, 'D': 1},
        'Женский футбол': {'D': -1},
    },
}

$(function(){
    $('.answerrow').hide()
    $('.start').show()
    $('#startlink').click(nextquestion);
    $('#choice1').click(getans);
    $('#choice2').click(getans);
    $('#choice3').click(getans);
    $('#choice4').click(getans);
});

quest = 0;

stat = {}

function mkres(res) {
    $('.answerrow').hide()
    $('#question-outer').hide()
    $('#result').show().text(res)
    $('#result').css({ 'width':'100%', 'text-align':'center' });
    var h1 = $('#result').height();
    var h = h1/2;
    var w1 = $(window).height();
    var w = w1/2;
    var m = w - h
    $('#result').css("padding-top",m + "px")
}

function finish() {
    mkres([
        [stat.A, 'A'],
        [stat.B, 'B'],
        [stat.C, 'C'],
        [stat.D, 'D'],
        [stat.P, 'P'],
    ].sort(function(a, b) {
        if (a[0] != b[0]) return b[0] - a[0];
        return a[1] > b[1];
    })[0][1]);
}

function nextquestion() {
    q = Object.keys(questions);
    if (q.length == 0) {
        return finish();
    }
    q = q[q.length * Math.random() << 0];
    $('.start').hide()
    $('.answerrow').show()
    $('#question').text(q);
    c = Object.keys(questions[q]);
    $('#choice1').text(c[0] || '');
    $('#choice2').text(c[1] || '');
    $('#choice3').text(c[2] || '');
    $('#choice4').text(c[3] || '');
}

function getans(ans) {
    ans = $(this).html();
    res = questions[q][ans];
    for (r in res) {
        if (r in stat) {
            stat[r] += res[r];
        } else {
            stat[r] = res[r];
        }
    }
    delete(questions[q]);
    nextquestion();
}
