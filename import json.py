import json
from tkinter import Tk, filedialog

def convert_text_to_json():
    # 파일 선택 대화상자 표시
    root = Tk()
    root.withdraw()  # Tkinter 창을 숨김
    file_path = filedialog.askopenfilename(filetypes=[("Text files", "*.txt")])
    
    if not file_path:
        print("No file selected")
        return

    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # 텍스트 데이터를 JSON으로 변환
    items = []
    for line in lines:
        parts = line.strip().split('\t')  # 탭으로 구분
        items.append({
            "id": parts[0],
            "hex": parts[1],
            "bag": parts[2],
            "name": parts[3]
        })

    # JSON 데이터 저장
    json_data = json.dumps(items, indent=4)
    output_file = file_path.replace('.txt', '.json')
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(json_data)

    print(f"Converted JSON saved to {output_file}")

if __name__ == "__main__":
    convert_text_to_json()
