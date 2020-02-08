// using howler for sound functions. The following file must be in all html pages
// <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.2/howler.js"></script>

const victory = new Howl({
    src: ["../soundfiles/Music/victory.mp3"],
    loop: false,
    autoplay: true,
  });

const defeat = new Howl({
    src: ["../soundfiles/Music/defeat.mp3"],
    loop: false,
    autoplay: true,
  });

const attack = new Howl({
    src: ["../soundfiles/Music/attack.wav"],
    loop: false,
    autoplay: true,
  });

  



  victory.play();
  defeat.play();
  attack.play();


