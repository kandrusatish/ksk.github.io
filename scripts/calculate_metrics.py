# scripts/calculate_metrics.py
import sys
import json
import evaluate

def calculate_metrics(text1, text2):
    bleu = evaluate.load('bleu')
    rouge = evaluate.load('rouge')
    meteor = evaluate.load('meteor')

    bleu_score = bleu.compute(predictions=[text2], references=[text1])
    rouge_score = rouge.compute(predictions=[text2], references=[text1])
    meteor_score = meteor.compute(predictions=[text2], references=[text1])

    results = {
        'bleu': bleu_score,
        'rouge': rouge_score,
        'meteor': meteor_score
    }

    return results

if __name__ == '__main__':
    #print(calculate_metrics("who are you?","what are you?"))
    
    input_data = json.loads(sys.stdin.read())
    text1 = input_data['text1']
    text2 = input_data['text2']

    metrics = calculate_metrics(text1, text2)

    print(json.dumps(metrics))