from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = "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"

@app.route('/chat', methods=['GET','POST'])
def chat():
    try:
        user_question = request.json.get('question')
        transaction_data = request.json.get('transactions')
        budget_data = request.json.get('budget')

        # Prepare a message that includes both the question and financial data
        # User Question: {user_question}
        system_message = f'''
            [Financial Manager Mode Activated] You are an AI tasked with this objective: 
            Assist the user in interpreting their transaction and budget data based on their 
            question and provided data. Respond with advice that is VERY SPECIFIC and RELEVANT 
            to the user's transaction and budget details. Try your best to cite transactions or 
            budget details in your responses.

            Monthly Transaction Data:
            {transaction_data} 

            Monthly Budget:
            {budget_data}

            Keep in mind that your responses will be limited to less than 500 tokens (~500 words).
        '''

        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_question}
        ]

        # # Generate a response using GPT-3
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613",
            messages=messages, max_tokens=500
        )

        return jsonify({"response": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)})