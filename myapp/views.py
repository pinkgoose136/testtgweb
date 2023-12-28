from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
import json
from django.http import JsonResponse
from .models import *
import random
from django.core.serializers import serialize
import json
from django.http import JsonResponse

def home(request):
    return HttpResponse("Привет, это мой первый сайт на Django!!!!!!!!")

def create_test(request):
    return render(request, 'create_test.html')

def save_data(request):
    if request.method == 'POST':
        f = request.POST
        que = [r for r in f if r.split('_')[0] == 'que']
        qq1 = {}
        for q in que:
            qq1[q] = [r for r in f if r.split('_')[0] == 'ans' and r.split('_')[2] == q.split('_')[1]]

        qqq = {}

        for key in qq1.keys():
            qqq[key] = {}
            qqq[key]['que'] = f[key]
            qqq[key]['ans'] = {}
            right = f["correctAnswer_"+key.split('_')[1]]
            for t in qq1[key]:
                qqq[key]['ans'][t] = f[t]
            qqq[key]['right'] = right

        data = {}
        data_list = [r for r in f if r.split('_')[0] == 'row']

        for item in data_list:
            key = item.split('_')[1] 
            if key not in data:
                data[key] = {}
            data[key][item.split('_')[-1]] = f[item]

        row_json = json.dumps(data)
        qqq_json = json.dumps(qqq)

        print(qqq)
        print(data)

        idi = random.randint(1000, 1999) 
        new_data_entry = info(test_id=idi, name=f['name'], desc=f['desc'], type=f['type'])
        new_data_entry.save() 

        for q in qqq.keys():
            xq = int(q.split('_')[1])
            new_data_entry = questions(test_id=idi, question_id=xq, question=qqq[q]['que'], right=int(qqq[q]['right']))
            new_data_entry.save()
            ans = qqq[q]['ans']
            for a in ans.keys():
                new_data_entry = answers(test_id=idi, question_id=xq, answer_id=int(a.split('_')[1]), answer=qqq[q]['ans'][a])
                new_data_entry.save()

        for r in data.keys():
            new_data_entry = results(test_id=idi, res_id=r, min=data[r]['min'], max=data[r]['max'], text=data[r]['text'])
            new_data_entry.save() 

        data1 = list(info.objects.all().values())
        data2 = list(questions.objects.all().values())
        data3 = list(answers.objects.all().values())
        data4 = list(results.objects.all().values())

        ke1 = [eo for eo in data1 if eo['test_id'] == idi]
        ke2 = [eo for eo in data2 if eo['test_id'] == idi]
        ke3 = [eo for eo in data3 if eo['test_id'] == idi]
        ke4 = [eo for eo in data4 if eo['test_id'] == idi]

        return render(request, 'show_data.html', {
            "row": row_json,
            'a': json.dumps(ke1),
            'b': json.dumps(ke2),
            'c': json.dumps(ke3),
            'd': json.dumps(ke4),
            'testid': idi
        })
    
def list(request):
    data1 = info.objects.all().values()

    return render(request, 'test_list.html', {
        'a': data1
    })

def test(request):
    test_idd = request.GET.get('id')

    data1 = info.objects.filter(test_id=test_idd).values()
    data2 = questions.objects.filter(test_id=test_idd).values()
    data4 = results.objects.filter(test_id=test_idd).values()

    list = {} 
    for d in data2:
        list[d['question_id']] = {}
        list[d['question_id']]['info'] = {'que': d['question'], 'right': d['right']}
        list[d['question_id']]['answers'] = {}
        data33 = answers.objects.filter(test_id=test_idd, question_id=d['question_id']).values()
        for a in data33:
            list[d['question_id']]['answers'][a['answer_id']] = a['answer']

    lst = []
    for d in data4:
        lst.append([d['min'], d['max'], d['text']])

    return render(request, 'test.html', {
            'a': data1,
            'r': json.dumps(lst),
            'q': json.dumps(list),
        })
