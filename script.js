document.addEventListener("DOMContentLoaded", () => {
    const followBtn = document.querySelector(".follow-btn");
    const followersCount = document.getElementById("followers-count");

    // Support multiple follow buttons (page button + floating button)
    const followButtons = document.querySelectorAll(".follow-btn");

    function setFollowingState(isFollowing) {
        followButtons.forEach(btn => {
            btn.textContent = isFollowing ? "Following" : "Follow";
            if (isFollowing) {
                btn.style.background = "#efefef";
                btn.style.color = "#000";
            } else {
                btn.style.background = "#0095f6";
                btn.style.color = "#fff";
            }
        });
    }

    // initialize state from the main button text
    let isFollowing = Array.from(followButtons).some(b => b.textContent === "Following");

    followButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            isFollowing = !isFollowing;
            setFollowingState(isFollowing);
            const current = parseInt(followersCount.textContent);
            followersCount.textContent = isFollowing ? current + 1 : Math.max(0, current - 1);
        });
    });
    // Modal / image click handlers — run after DOM is ready
    const modalEl = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.getElementById("close");

    const postimages = document.querySelectorAll(".post img");

    postimages.forEach(img => {
        img.addEventListener("click", () => {
            if (!modalEl || !modalImg) return;
            modalEl.style.display = "flex";
            modalImg.src = img.src;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (modalEl) modalEl.style.display = "none";
        });
    }

    if (modalEl) {
        modalEl.addEventListener("click", (e) => {
            if (e.target === modalEl) {
                modalEl.style.display = "none";
            }
        });
    }

    // Message modal handlers
    const messageBtn = document.querySelector(".message-btn");
    const messageModal = document.getElementById("message-modal");
    const messageClose = document.getElementById("message-close");
    const messageSend = document.getElementById("message-send");
    const messageText = document.getElementById("message-text");

    if (messageBtn && messageModal) {
        messageBtn.addEventListener("click", () => {
            messageModal.style.display = "flex";
            if (messageText) messageText.focus();
        });
    }

    if (messageClose) {
        messageClose.addEventListener("click", () => {
            if (messageModal) messageModal.style.display = "none";
        });
    }

    if (messageSend) {
        messageSend.addEventListener("click", () => {
            const text = messageText ? messageText.value.trim() : "";
            if (text) console.log("Message sent:", text);
            if (messageModal) messageModal.style.display = "none";
            if (messageText) messageText.value = "";
        });
    }

    if (messageModal) {
        messageModal.addEventListener("click", (e) => {
            if (e.target === messageModal) messageModal.style.display = "none";
        });
    }
});
