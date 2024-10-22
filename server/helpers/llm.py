from transformers import AutoTokenizer


DEFAULT_MODEL_NAME = "meta-llama/Meta-Llama-3-8B"


def get_token_count(text: str, model_name: str = DEFAULT_MODEL_NAME) -> int:
    """
    This function returns the number of tokens in a given text.
    
    @param text: str - The text to tokenize.
    @param model_name: str - The model name to use for tokenization.
    @return: int - The number of tokens in the text.
    """

    tokenizer = AutoTokenizer.from_pretrained(model_name) # Load the tokenizer
    tokens = tokenizer.tokenize(text)
    num_tokens = len(tokens)
    
    return num_tokens