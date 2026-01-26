(function() {
    // ▼▼▼ 비밀번호 설정 (여기만 바꾸세요) ▼▼▼
    const SECRET_CODE = "uft비번0916"; 
    // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

    // 1. 스타일(CSS) 자동 주입
    const style = document.createElement('style');
    style.innerHTML = `
        /* 잠금 화면 스타일 */
        #lock-screen {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: #0d1117; z-index: 999999;
            display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            font-family: 'Noto Sans KR', sans-serif; color: #c9d1d9;
        }
        #lock-box {
            background: #161b22; border: 1px solid #30363d;
            padding: 40px; border-radius: 12px; text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        #lock-input {
            padding: 12px; border-radius: 6px; border: 1px solid #30363d;
            background: #0d1117; color: #fff; margin: 20px 0; width: 200px;
            text-align: center; font-size: 1rem;
        }
        #lock-btn {
            padding: 10px 25px; background: #238636; color: white;
            border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;
            transition: 0.2s;
        }
        #lock-btn:hover { background: #2ea043; }
        #lock-msg { color: #ff7b72; margin-top: 15px; font-size: 0.9rem; display: none; }
    `;
    document.head.appendChild(style);

    // 2. 잠금 화면(HTML) 자동 생성
    const lockScreen = document.createElement('div');
    lockScreen.id = 'lock-screen';
    lockScreen.innerHTML = `
        <div id="lock-box">
            <h2 style="margin:0 0 10px 0; color:#58a6ff;">🔒 페이지 잠금</h2>
            <p style="color:#8b949e; font-size:0.9rem;">작성자 전용 공간입니다.</p>
            <input type="password" id="lock-input" placeholder="비밀번호 입력">
            <br>
            <button id="lock-btn">확인</button>
            <p id="lock-msg">비밀번호가 일치하지 않습니다.</p>
        </div>
    `;
    
    // 페이지가 로드되자마자 잠금 화면으로 덮어버림
    document.addEventListener("DOMContentLoaded", function() {
        document.body.appendChild(lockScreen);
        document.body.style.overflow = "hidden"; // 스크롤 막기
        
        const input = document.getElementById('lock-input');
        const btn = document.getElementById('lock-btn');
        const msg = document.getElementById('lock-msg');

        // 확인 기능
        function unlock() {
            if (input.value === SECRET_CODE) {
                lockScreen.style.opacity = '0';
                lockScreen.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    lockScreen.remove();
                    document.body.style.overflow = "auto"; // 스크롤 풀기
                }, 500);
            } else {
                msg.style.display = 'block';
                input.value = '';
                input.focus();
            }
        }

        btn.onclick = unlock;
        input.addEventListener("keydown", (e) => { if(e.key === "Enter") unlock(); });
        input.focus();
    });
})();
