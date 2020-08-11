$(function() {
    var playerTrack = $("#player-track");
    var bgArtwork = $("#bg-artwork");
    var bgArtworkUrl;
    var albumName = $("#album-name");
    var trackName = $("#track-name");
    var albumArt = $("#album-art"),
        sArea = $("#s-area"),
        seekBar = $("#seek-bar"),
        trackTime = $("#track-time"),
        insTime = $("#ins-time"),
        sHover = $("#s-hover"),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find("i"),
        tProgress = $("#current-time"),
        tTime = $("#track-length"),
        seekT,
        seekLoc,
        seekBarPos,
        cM,
        ctMinutes,
        ctSeconds,
        curMinutes,
        curSeconds,
        durMinutes,
        durSeconds,
        playProgress,
        bTime,
        nTime = 0,
        buffInterval = null,
        tFlag = false;

    var playPreviousTrackButton = $("#play-previous"),
        playNextTrackButton = $("#play-next"),
        currIndex = -1;

    var songs = [{
            artist: "Trang",
            name: "Ai",
            url: "Musics/Ai_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Kim",
            name: "Anh sẽ ôm em đến hết mùa hoa rơi",
            url: "Musics/Anhseomemdenhetmuahoaroi_Kim.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Bài hát của em",
            url: "Musics/Baihatcuaem_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Kim Tuyên",
            name: "Bản tình ca đơn phương",
            url: "Musics/BanTinhCaDonPhuong_KimTuyen.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Bụi hoa giấy",
            url: "Musics/Buihoagiay_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Chẳng một ai thấy",
            url: "Musics/Changmotaithay_trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Cam ft Quỳnh",
            name: "Chết đi cho rồi",
            url: "Musics/ChetDiChoRoi_Cam_KimTuyen.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Tiến Thành",
            name: "Chuyện của mùa đông",
            url: "Musics/Chuyencuamuadong_TienThanh.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Tùng",
            name: "Con dế mèn hát vào mùa hạ",
            url: "Musics/ConDeMenHatVaoMuaHe_tung.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Khoai Lang Thang",
            name: "Đợi nụ cười em",
            url: "Musics/Doinucuoiem_KhoaiLangThang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "DatKaa",
            name: "Dừng thương",
            url: "Musics/Dungthuong_Datkaa.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Chillies",
            name: "Đường chân trời",
            url: "Musics/Duongchantroi_chilliess.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Suni Hạ Linh",
            name: "Em đã biết",
            url: "Musics/EmDaBiet_SuniHaLinh.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Em viết nên",
            url: "Musics/Emvietnen_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Bệt Band",
            name: "Hãy nói đi",
            url: "Musics/Haynoidi_BetBand.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "I don't wanna miss you",
            url: "Musics/Idontwannamissyou_trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Khải ft Xén",
            name: "Kẻ cô đơn trong thành phố này",
            url: "Musics/KeCoDonTrongThanhPhoNay_Khai_Xen.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Hai Sam",
            name: "Lấm Lem",
            url: "Musics/LamLem_Haisam.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "JSOL",
            name: "Lặng",
            url: "Musics/Lang_JSOL.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Hai Sam",
            name: "Lạnh thôi đừng mưa",
            url: "Musics/Lanhthoidungmua_Haisam.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Bozitt",
            name: "Mãi chẳng thuộc về nhau",
            url: "Musics/Maichangthuocvenhau_Bozitt.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Một bài hát cho nhau (1)",
            url: "Musics/Motbaihatchonhau_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Vũ.",
            name: "Một giấc mơ",
            url: "Musics/Motgiacmo_Vu.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Khoai Lang Thang",
            name: "Muốn yêu thật lâu một người",
            url: "Musics/Muonyeumotnguoithatlau_KhoaiLangThang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Nếu anh cần tối",
            url: "Musics/Neuanhcantoi_trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Thịnh suy",
            name: "Nghe em",
            url: "Musics/Ngheem_ThinhSuy.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Uyên Pím",
            name: "Nhẹ",
            url: "Musics/Nhe_UyenPim.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Những khi đêm về",
            url: "Musics/Nhungkhidemve_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Thái Đinh",
            name: "Sao ta gặp nhau",
            url: "Musics/Saotagapnhau_ThaiDinh.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "TRI",
            name: "Sau khi chia tay... Ai cũng khác",
            url: "Musics/Saukhichiatayaicungkhac_TRI.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Minh Đinh",
            name: "Thế giới của em",
            url: "Musics/Thegioicuaem_MinhDinh.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Hai Sam",
            name: "Thế thôi",
            url: "Musics/Thethoi_HaiSam.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Thư cho anh",
            url: "Musics/Thuchoanh_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Tỉnh giấc khi ông trời còn đang ngủ",
            url: "Musics/TinhGiacKhiOngTroiDangNgu_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Pink Frog",
            name: "Tôi và em",
            url: "Musics/Toivaem_Pinkfrog.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Từ khi yêu anh",
            url: "Musics/Tukhiyeuanh_trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Và khi ta ngả nghiêng",
            url: "Musics/Vakhitanganghieng_trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Châu Dương",
            name: "Yêu",
            url: "Musics/Yeu_chauduong.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Clow ft Linh Thộn",
            name: "Yêu lại chút thôi",
            url: "Musics/Yeulaichutthoi_Clow_LinhThon.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Rica ft Huy Lê",
            name: "Anh có điều bí mật",
            url: "Musics/Anhcodieubimat_Rica_HuyLe.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Rica ft Xơn",
            name: "Anh sẽ không đi đâu hết",
            url: "Musics/Anhsekhongdidauhet_Xon_Rica.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Thịnh Suy",
            name: "Chuyện rằng",
            url: "Musics/Chuyenrang_ThinhSuy.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "1000 Km",
            url: "Musics/1000km.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang ft Khoa Vũ",
            name: "Giữ cho em một thế giới",
            url: "Musics/Giuchoemmotthegioi_Trang_KhoaVu.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Một bài hát cho nhau (2)",
            url: "Musics/motbaihatchonhau2.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Một bài hát cho nhau (3)",
            url: "Musics/motbaihatchonhau3.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Trang",
            name: "Ta mơ thấy nhau",
            url: "Musics/Tamothaynhau_Trang.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Uyên Pím",
            name: "Mưa đã lâu",
            url: "Musics/MuaDaLau_UyenPim.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Andiez",
            name: "Chờ đợi có đáng sợ?",
            url: "Musics/Chodoicodangso_andiez.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Vũ.",
            name: "Đông kiếm em",
            url: "Musics/Dongkiemem_Vu.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Vũ.",
            name: "Mùa mưa ngâu nằm cạnh",
            url: "Musics/Muamuangaunamcanh_Vu.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        },
        {
            artist: "Hoàng Dũng",
            name: "Nàng thơ",
            url: "Musics/Nangtho_HoangDung.mp3",
            picture: "https://i1.sndcdn.com/artworks-000594318516-jutk7g-t500x500.jpg",
        }
    ];

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    songs = shuffle(songs);

    function playPause() {
        setTimeout(function() {
            if (audio.paused) {
                playerTrack.addClass("active");
                albumArt.addClass("active");
                checkBuffering();
                i.attr("class", "fas fa-pause");
                audio.play();
            } else {
                playerTrack.removeClass("active");
                albumArt.removeClass("active");
                clearInterval(buffInterval);
                albumArt.removeClass("buffering");
                i.attr("class", "fas fa-play");
                audio.pause();
            }
        }, 300);
    }

    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if (ctMinutes < 0 || ctSeconds < 0) return;

        if (ctMinutes < 0 || ctSeconds < 0) return;

        if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
        if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
        else insTime.text(ctMinutes + ":" + ctSeconds);

        insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
    }

    function hideHover() {
        sHover.width(0);
        insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass("active");
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10) curMinutes = "0" + curMinutes;
        if (curSeconds < 10) curSeconds = "0" + curSeconds;

        if (durMinutes < 10) durMinutes = "0" + durMinutes;
        if (durSeconds < 10) durSeconds = "0" + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
        else tProgress.text(curMinutes + ":" + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
        else tTime.text(durMinutes + ":" + durSeconds);

        if (
            isNaN(curMinutes) ||
            isNaN(curSeconds) ||
            isNaN(durMinutes) ||
            isNaN(durSeconds)
        )
            trackTime.removeClass("active");
        else trackTime.addClass("active");

        seekBar.width(playProgress + "%");

        if (playProgress == 100) {
            i.attr("class", "fa fa-play");
            seekBar.width(0);
            tProgress.text("00:00");
            albumArt.removeClass("buffering").removeClass("active");
            clearInterval(buffInterval);
            selectTrack(1);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function() {
            if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
            else albumArt.removeClass("buffering");

            bTime = new Date();
            bTime = bTime.getTime();
        }, 100);
    }

    function selectTrack(flag) {
        if (flag == 0 || flag == 1) ++currIndex;
        else --currIndex;

        if (currIndex > -1 && currIndex < songs.length) {
            if (flag == 0) i.attr("class", "fa fa-play");
            else {
                albumArt.removeClass("buffering");
                i.attr("class", "fa fa-pause");
            }

            seekBar.width(0);
            trackTime.removeClass("active");
            tProgress.text("00:00");
            tTime.text("00:00");

            currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                audio.play();
                playerTrack.addClass("active");
                albumArt.addClass("active");

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $("#album-art img").prop("src", bgArtworkUrl);
        } else {
            if (flag == 0 || flag == 1) --currIndex;
            else ++currIndex;
        }
    }

    function initPlayer() {
        audio = new Audio();

        selectTrack(0);

        audio.loop = false;

        playPauseButton.on("click", playPause);

        sArea.mousemove(function(event) {
            showHover(event);
        });

        sArea.mouseout(hideHover);

        sArea.on("click", playFromClickedPos);

        $(audio).on("timeupdate", updateCurrTime);

        playPreviousTrackButton.on("click", function() {
            selectTrack(-1);
        });
        playNextTrackButton.on("click", function() {
            selectTrack(1);
        });
    }

    initPlayer();
});