# import openai

# openai.api_key = "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"

# completion = openai.ChatCompletion.create(
#     model="gpt-3.5-turbo", 
#     messages=[{"role": "user", "content": 
#                "Write a story less than 100 words about a penguin"}]
# )
# print(completion.choices[0].message.content)

string = """ Once, in the icy lands of Antarctica, a little penguin named Pip dreamed of soaring through the skies like his 
feathered friends. Day after day, he diligently watched as majestic albatrosses glided effortlessly above him. Determined, Pip 
practiced flapping his little wings until one day, he took a leap of faith and boldly jumped off an iceberg. For a brief moment, 
he experienced the exhilaration of flight before gravity pulled him back to his icy home. Though he couldn't soar like the 
albatrosses, Pip's indomitable spirit and sense of adventure remained unmatched, as he embraced his unique penguin journey with joy.
"""
import tiktoken

encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")

def num_tokens_from_string(string: str) -> int:
    """Returns the number of tokens in a text string."""
    num_tokens = len(encoding.encode(string))
    return num_tokens

print(num_tokens_from_string(string))