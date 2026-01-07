from sentence_transformers import SentenceTransformer

print("Pre-downloading SentenceTransformer model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model downloaded successfully.")
