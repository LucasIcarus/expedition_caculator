/**
 * Created by Fancy on 2016/3/10 0010.
 */



$(document).ready(function () {
    var picked_num = [],
        result = [0, 0, 0, 0, 0, 0, 0, 0],
        chapter_selection_buttons = $('div.ui-field-contain:eq(0) label'),
        display_zone = $('div.ui-field-contain:eq(1) fieldset');



    (function () {
        function Expedition(chapter, code, name, fule, ammunition, steel, aluminum, experience, grade, number, require,
                            time, reward, probability) {
            this.chapter = chapter;
            this.code = code;
            this.name = name;
            this.fule = fule;
            this.ammunition = ammunition;
            this.steel = steel;
            this.aluminum = aluminum;
            this.experience = experience;
            this.grade = grade;
            this.number = number;
            this.require = require;
            this.time = time;
            this.reward = reward;
            this.probabilty = probability;
        }

        Expedition.prototype = {
            constructor: Expedition,
            getRewardName: function () {
                switch (this.reward) {
                    case 0:
                        return "none";
                    case 1:
                        return "快速修理";
                    case 2:
                        return "快速建造";
                    case 3:
                        return "舰船蓝图";
                    case 4:
                        return "装备蓝图";
                }
            },
            getExpect: function () {
                return this.probabilty[1] + 2 * this.probabilty[2];
            },
            getGreatExpect: function () {
                if (this.probabilty[2] !== 0) {
                    return 2;
                } else if (this.probabilty[1] !== 0) {
                    return 1;
                } else {
                    return 0;
                }
            }
        };

        var ExpeditionAll = [],
            e_1_1 = new Expedition(1, 1, "航海训练", 0, 30, 0, 0, 10, 1, 2, "none", 15, 0, [0, 0, 0]),
            e_1_2 = new Expedition(1, 2, "长距离航海训练", 0, 30, 30, 0, 20, 2, 3, "1DD", 30, 1, [0.7, 0.3, 0]),
            e_1_3 = new Expedition(1, 3, "警备任务", 30, 30, 30, 0, 30, 3, 4, "2DD", 30, 0, [0, 0, 0]),
            e_1_4 = new Expedition(1, 4, "对潜警戒", 0, 100, 0, 0, 40, 5, 4, "2DD", 60, 2, [0.6, 0.3, 0.1]),
            e_2_1 = new Expedition(2, 1, "海上护卫", 150, 175, 20, 20, 50, 5, 5, "1CL2DD", 120, 3, [0.7, 0.3, 0]),
            e_2_2 = new Expedition(2, 2, "防空演习", 0, 0, 0, 75, 60, 10, 4, "2CL", 45, 0, [0, 0, 0]),
            e_2_3 = new Expedition(2, 3, "观舰仪式演练", 0, 0, 50, 30, 70, 10, 6, "none", 60, 4, [0.5, 0.4, 0.1]),
            e_2_4 = new Expedition(2, 4, "观舰仪式", 50, 100, 50, 50, 80, 10, 6, "none", 180, 1, [0.5, 0.5, 0]),
            e_3_1 = new Expedition(3, 1, "护卫任务", 350, 0, 0, 0, 90, 15, 4, "2DD", 240, 4, [0.5, 0.5, 0]),
            e_3_2 = new Expedition(3, 2, "强行侦查", 50, 0, 50, 30, 100, 20, 4, "1DD", 90, 2, [0.7, 0.3, 0]),
            e_3_3 = new Expedition(3, 3, "铝材运输", 0, 0, 0, 250, 110, 8, 4, "1CA", 300, 0, [0, 0, 0]),
            e_3_4 = new Expedition(3, 4, "资源运输", 50, 250, 200, 50, 120, 12, 4, "1CA", 480, 3, [0.5, 0.5, 0]),
            e_4_1 = new Expedition(4, 1, "技术运输行动", 240, 300, 0, 0, 130, 20, 6, "4DD", 240, 1, [0.5, 0.5, 0]),
            e_4_2 = new Expedition(4, 2, "支援陆战队撤退", 0, 240, 200, 0, 140, 30, 6, "2CL2DD", 360, 2, [0.3, 0.7, 0]),
            e_4_3 = new Expedition(4, 3, "支援机动部队", 0, 0, 300, 400, 150, 20, 6, "2CL", 720, 3, [0.2, 0.6, 0.2]),
            e_4_4 = new Expedition(4, 4, "援护舰队行动", 0, 200, 0, 90, 160, 30, 4, "none", 210, 0, [0, 0, 0]),
            e_5_1 = new Expedition(5, 1, "索敌侦查行动", 120, 0, 120, 0, 170, 25, 4, "3DD", 120, 2, [0.5, 0.5, 0]),
            e_5_2 = new Expedition(5, 2, "航空机输送行动", 0, 0, 0, 180, 180, 25, 6, "1CVL2DD", 300, 4, [0.6, 0.4, 0]),
            e_5_3 = new Expedition(5, 3, "地中海行动", 60, 80, 0, 0, 190, 40, 6, "1BB2DD", 60, 0, [0, 0, 0]),
            e_5_4 = new Expedition(5, 4, "驱逐舰哨位任务", 0, 0, 200, 0, 200, 50, 6, "6DD", 120, 1, [0.3, 0.6, 0.1]),
            e_6_1 = new Expedition(6, 1, "补给航线护卫", 800, 0, 0, 0, 210, 45, 6, "1CL3DD", 540, 0, [0, 0, 0]),
            e_6_2 = new Expedition(6, 2, "主力舰队演习", 0, 200, 200, 0, 220, 50, 6, "1BB", 180, 3, [0.5, 0.5, 0]),
            e_6_3 = new Expedition(6, 3, "航母编队演习", 200, 0, 0, 100, 230, 50, 6, "1BBV", 240, 3, [0.3, 0.6, 0.1]),
            e_6_4 = new Expedition(6, 4, "莱茵演习", 0, 1000, 0, 0, 240, 50, 4, "2CA2DD", 720, 4, [0, 1, 0]);

        ExpeditionAll.push(e_1_1, e_1_2, e_1_3, e_1_4, e_2_1, e_2_2, e_2_3, e_2_4, e_3_1, e_3_2,
            e_3_3, e_3_4, e_4_1, e_4_2, e_4_3, e_4_4, e_5_1, e_5_2, e_5_3, e_5_4, e_6_1, e_6_2,
            e_6_3, e_6_4);
        window.ExpeditionAll = ExpeditionAll;
    })();

    function setDisplayLogic() {
        chapter_selection_buttons.on("click", function () {
            var chapter_code = parseInt(this.nextSibling.value);
            display_zone.hide();
            display_zone.eq(chapter_code).show();
            display_zone.eq(chapter_code+6).show();
        });
    }

    function refreshData(num) {
        for (var i = 0; i < num; i++) {
            var td = $('.ui-field-contain:eq(2) .detail-table:eq(' + i + ') td'),
                exp = ExpeditionAll[picked_num[i]];
            td.eq(0).text(""+exp.chapter+"-"+exp.code);
            td.eq(1).text(exp.time);
            td.eq(2).text(exp.grade+'lv+');
            td.eq(3).text(exp.require);
            td.eq(4).text(exp.fule);
            td.eq(5).text(exp.ammunition);
            td.eq(6).text(exp.steel);
            td.eq(7).text(exp.aluminum);
            td.eq(8).text(exp.getRewardName());

        }
    }

    function refreshDetails() {
        var tables = $('.ui-field-contain:eq(2) .detail-table');
        switch (picked_num.length) {
            case 0 :
                tables.hide();
                refreshData(0);
                break;
            case 1:
                tables.hide();
                refreshData(1);
                tables.eq(0).show();
                break;
            case 2:
                tables.hide();
                refreshData(2);
                tables.eq(0).show();
                tables.eq(1).show();
                break;
            case 3:
                tables.hide();
                refreshData(3);
                tables.eq(0).show();
                tables.eq(1).show();
                tables.eq(2).show();
                break;
            case 4:
                tables.hide();
                refreshData(4);
                tables.show();
                break;
        }
    }

    function deleteLogic() {
        var del_btn = $('th[rowspan="3"] a'),
            i,len;
        for (i = 0,len=4; i < len; i++) {
            (function (value) {
                del_btn.eq(value).on("click", function (event) {
                    event.preventDefault();
                    var lol = picked_num[value];
                    picked_num.splice(value,1);
                    $('div.ui-field-contain:eq(1) input').filter(function () {
                        return this.value == lol;
                    }).trigger("click");
                    refreshDetails();
                });
            })(i);
        }
    }

    function setSelectionLogic() {
        var exp_display_labels = $('div.ui-field-contain:eq(1) label');
        exp_display_labels.on("click.add_exp", function () {
            if ($(this).hasClass("ui-btn-active")) {
                var position = picked_num.indexOf(parseInt(this.nextSibling.value));
                picked_num.splice(position,1);
            } else {
                if (picked_num.length > 3) {
                    var lol = picked_num[0];
                    picked_num.shift();
                    $('div.ui-field-contain:eq(1) input').filter(function () {
                        return this.value == lol;
                    }).trigger("click");
                    picked_num.push(parseInt(this.nextSibling.value));
                } else {
                    picked_num.push(parseInt(this.nextSibling.value));
                }
            }
            refreshDetails();
        });
    }

    function resultDisplay () {
        var con = $('#result'),
            con_tds = con.find('td'),
            re = /^[0-9]*\.+[0-9]*$/,
            re_1 = /^[0-9]*\.0$/,
            i;
        for (i = 0; i < 8; i++) {
            if (re.test(result[i].toString())) {
                result[i] = result[i].toFixed(1);
            }
            if (re_1.test(result[i].toString())) {
                result[i] = parseInt(result[i])
            }
            con_tds.eq(i).text(result[i]);
            result[i] = 0;
        }
        con.show().focus();
    }

    function calculate() {

        var exp,
            num,
            day_num,
            hour_num,
            allo,
            card,
            crit_rate;

        //时间参数
        day_num = parseInt($('#day_num').val());
        hour_num = parseInt($('#hour_num').val());
        
        //是否考虑低保
        if ($('.ui-field-contain:eq(3) label:eq(0)').hasClass("ui-btn-active")) {
            allo = 1;
        } else {
            allo = 0;
        }
        
        //是否考虑月卡
        if ($('.ui-field-contain:eq(3) label:eq(1)').hasClass("ui-btn-active")) {
            card = 1;
        } else {
            card = 0;
        }
        
        //大成功几率
        crit_rate = parseInt($("#crit_rate").val())/100;

        //计算部分

        //低保和月卡
        result[0] += day_num *(allo * 24 * 60 + card * 500);
        result[1] += day_num *(allo * 24 * 60 + card * 500);
        result[2] += day_num *(allo * 24 * 60 + card * 500);
        result[3] += day_num *(allo * 24 * 20 + card * 500);
        result[5] += card * day_num;

        //远征
        for (var i = 0,len = picked_num.length; i < len; i++) {
            exp = ExpeditionAll[picked_num[i]];
            num = day_num * parseInt(hour_num * 60 / exp.time);
            if (exp.time < 24 - hour_num) {
                num += day_num - 1;
            }
            result[0] += (num * exp.fule) * (1 + crit_rate / 2);
            result[1] += (num * exp.ammunition) * (1 + crit_rate / 2);
            result[2] += (num * exp.steel) * (1 + crit_rate / 2);
            result[3] += (num * exp.aluminum) * (1 + crit_rate / 2);
            switch (exp.reward) {
                case 1:
                    result[4] += num * ((1 - crit_rate) * exp.getExpect()
                        + crit_rate * exp.getGreatExpect());
                    break;
                case 2:
                    result[5] += num * ((1 - crit_rate) * exp.getExpect()
                        + crit_rate * exp.getGreatExpect());
                    break;
                case 3:
                    result[6] += num * ((1 - crit_rate) * exp.getExpect()
                        + crit_rate * exp.getGreatExpect());
                    break;
                case 4:
                    result[7] += num * ((1 - crit_rate) * exp.getExpect()
                        + crit_rate * exp.getGreatExpect());
                    break;
            }
        }
        resultDisplay();
    }


    setDisplayLogic();
    setSelectionLogic();
    deleteLogic();
    $('#confirm').on("click", function (event) {
        event.preventDefault();
        calculate();
    })
});