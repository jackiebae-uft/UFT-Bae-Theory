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
            min-width: 300px; /* 박스 최소 너비 */
        }
        
        /* 비밀번호 입력 래퍼 (아이콘 배치를 위해) */
        .password-wrapper {
            position: relative;
            width: 220px;
            margin: 20px auto;
        }

        #lock-input {
            width: 100%;
            padding: 12px 40px 12px 12px; /* 오른쪽 여백(아이콘 자리) 확보 */
            border-radius: 6px; border: 1px solid #30363d;
            background: #0d1117; color: #fff;
            text-align: center; font-size: 1rem;
            box-sizing: border-box; /* 패딩 포함 너비 계산 */
        }
        
        /* 눈 아이콘 버튼 */
        #toggle-btn {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            font-size: 1.2rem;
            border: none;
            background: none;
            padding: 0;
            line-height: 1;
        }
        #toggle-btn:hover { filter: brightness(1.2); }

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
            
            <div class="password-wrapper">
                <input type="password" id="lock-input" placeholder="비밀번호 입력">
                <span id="toggle-btn" title="비밀번호 보기">👁️</span>
            </div>

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
        const toggleBtn = document.getElementById('toggle-btn');

        // [기능 추가] 비밀번호 보기/숨기기 토글
        toggleBtn.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            // 아이콘 변경: 비밀번호가 보일 땐 '🔓', 감춰질 땐 '👁️'
            this.innerText = type === 'password' ? '👁️' : '🔓';
        });

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
                // 틀렸을 때 흔들기 효과
                const box = document.getElementById('lock-box');
                box.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-5px)' },
                    { transform: 'translateX(5px)' },
                    { transform: 'translateX(0)' }
                ], { duration: 300 });
            }
        }

        btn.onclick = unlock;
        input.addEventListener("keydown", (e) => { if(e.key === "Enter") unlock(); });
        input.focus();
    });
})();
