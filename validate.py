import json
from pathlib import Path
r=Path(__file__).parent;L=lambda n:json.loads((r/'data'/n).read_text());a=L('actors.json');rs=L('relations.json');A={x['id'] for x in a};assert len(A)==len(a);assert all(x['source_id'] in A and x['target_id'] in A for x in rs);print(f'OK: {len(a)} acteurs, {len(rs)} relations')
