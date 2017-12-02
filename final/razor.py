import textrazor

textrazor.api_key = "580f44d0d0ad4843de47e5675c44d35dd683c85c3368296d75402397"

client = textrazor.TextRazor(extractors=["computer", "graphics"])
response = client.analyze_url("problem, solving, technology")
