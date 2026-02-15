* {
    box-sizing: border-box;
    font-family: "Segoe UI", sans-serif;
}

body {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #ffe0ec, #fff7fb);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
}

/* Wrapper */
.wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

/* Card */
.card {
    width: 95vw;
    max-width: 1200px;
    min-height: 500px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    padding: 30px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
}

.card:hover {
    transform: scale(1.05); /* Hiệu ứng phóng to khi hover */
}

/* Content */
.content {
    flex: 1;
    padding-right: 20px;
}

.content h1 {
    font-size: 36px;
    color: #ff6b9d;
    margin-bottom: 10px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Đổ bóng cho tiêu đề */
}

.date {
    display: inline-block;
    background: #ff6b9d;
    color: #fff;
    padding: 8px 18px;
    border-radius: 30px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
}

.message {
    line-height: 1.6;
    color: #555;
    font-size: 18px;
}

/* Balloon Zone */
.balloon-zone {
    flex: 1;
    position: relative;
    min-height: 450px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
}

/* Balloon */
.balloon {
    position: absolute;
    bottom: -160px;
    width: 140px;
    animation: flyUp 7s linear forwards;
    cursor: pointer;
    will-change: transform;
}

.balloon img {
    width: 100%;
    border-radius: 50%;
    border: 5px solid #ff8bb5;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Tạo bóng đổ cho bóng bay */
}

/* Animation */
@keyframes flyUp {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-800px);
        opacity: 0;
    }
}

/* Zoom overlay */
.zoom {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.zoom img {
    max-width: 80%;
    max-height: 80%;
    border-radius: 20px;
}

/* Mobile */
@media (max-width: 768px) {
    .card {
        flex-direction: column;
        min-height: 100vh;
        border-radius: 0;
    }
}
