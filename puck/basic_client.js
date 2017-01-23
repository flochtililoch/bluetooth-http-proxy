const blink = (led, done) => {
  const on = () => led.write(true);
  const off = () => led.write(false);
  setTimeout(() => {
    on();
    setTimeout(() => {
      off();
      done();
    }, 300);
  }, 300);
};

setWatch(function() {
  NRF
    .requestDevice({timeout: 5000, filters: [{namePrefix: 'EspruinoHub'}]})
    .then((device) => {
      console.log(device);
      require('ble_http').httpRequest(device, 'pur3.co.uk/hello.txt', (d) => {
        console.log('GET:',JSON.stringify(d));
        if (JSON.stringify(d) === 'Hello World!') {
          blink(LED3, () => {
            blink(LED2, () => {
              blink(LED3, () => {
                blink(LED2, () => {
                });
              });
            });
          });
        } else {
          blink(LED3, () => {
            blink(LED3, () => {
            });
          });
        }
      });
    })
    .catch(error => {
      console.log(error);
      blink(LED1, () => {
        blink(LED1, () => {
        });
      });
    });
}, BTN, {edge:'rising', debounce:50, repeat:true});
