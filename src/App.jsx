import './styles.css'
import { useState, useEffect } from 'react'
import Thermometer from './components/Thermometer'
import Header from './components/Header'

export default function App() {
  const [timeCount, setTimeCount] = useState(0)
  const timeToDisplay = (timeCount / 100).toFixed(2)

  /*------ Eksik state'leri aşağıya ekleyin----------------------------*/

  const [buttonHeldDown, setButtonHeldDown] = useState(false)
  const [cursorInButton, setCursorInButton] = useState(false)

  /*------Yukarıdaya eksik state'leri ekleyin----------------------------*/

  const buttonClass = !timeCount ? 'outsideButton' : undefined

  /* Challenge

	Bu sanal eğlence parkı oyunu, korkunç bir bilgisayar korsanı iki state'ini ve dört event handler'ını sildiği için bozuldu. Sizin göreviniz aşağıdakileri yaparak oyunu düzeltmek: 
	
		1. Kullanıcının imleci "Basılı Tut" butonunun içine girerse ve mouse butonuna basarsa, eksik olan iki state'in değerleri buna göre değişmelidir. Bu durum değişiklikleri gerçekleşirse, aşağıdaki try bloğunun useEffect'indeki mevcut kod, zamanlayıcı ve termometrenin yükselmeye başlamasını sağlamalıdır.
		   
		2. Kullanıcının imleci butondan çıkarsa veya mouse butonunu bırakırsa, iki eksik state'in değerleri buna göre değişmelidir.
		   
		3. Tüm bunlar, eksik olay işleyicileri tarafından tetiklenen eksik state değerlerindeki değişiklikler yoluyla gerçekleştirilmelidir. Bu eksik state'ler ve olay işleyicilerinin yanında herhangi bir kodu SİLMEMELİ, eklememeli veya değiştirmemelisiniz. Bunu doğru şekilde yaparsanız aşağıdaki try bloğu ve useEffect zaten yazılmış oldukları için mükemmel şekilde çalışacaktır. 
		   
		Bonus Challenge: Dört olayın tamamını sadece iki - hatta sadece bir - fonksiyonla halledip halledemeyeceğinizi deneyin
*/

  // const handleMouseDown = () => {
  //   setButtonHeldDown(true)
  // }

  // const handleMouseUp = () => {
  //   setButtonHeldDown(false)
  // }

  // const handleMouseEnter = () => {
  //   setCursorInButton(true)
  // }

  // const handleMouseLeave = () => {
  //   setCursorInButton(false)
  // }

  //4 farklı fonksiyon yerine tek fonksiyonla çözüm --->
  const handleOnClick = (e) => {
    const eventType = e.type

    switch (eventType) {
      case 'mousedown':
        setButtonHeldDown(true)
        break
      case 'mouseup':
        setButtonHeldDown(false)
        break
      case 'mouseenter':
        setCursorInButton(true)
        break
      case 'mouseleave':
        setCursorInButton(fasle)
        break
      default:
        break
    }
  }

  try {
    useEffect(() => {
      let interval
      if (cursorInButton && buttonHeldDown) {
        interval = setInterval(() => {
          setTimeCount((timeCount) => timeCount + 1)
        }, 10)
      }
      return () => {
        setTimeCount(0)
        if (buttonHeldDown && !cursorInButton) {
          setButtonHeldDown(false)
        }
        clearInterval(interval)
      }
    }, [cursorInButton, buttonHeldDown])
  } catch {
    console.log(
      `AHAHAHA, uygulamanız hacklendi. İki state'inizi ve dört event handler'ınızı sildim. Onları yakalayabilir misin, bulmaya çalış 😜`
    )
  }

  /*------Aşağıya olay işleyicilerini ekleyin----------------------------*/
  return (
    <div className="wrapper">
      <Header time={+timeToDisplay} />
      <Thermometer time={+timeToDisplay} />
      <button
        className={buttonClass}
        onMouseDown={handleOnClick}
        onMouseUp={handleOnClick}
        onMouseEnter={handleOnClick}
        onMouseLeave={handleOnClick}
      >
        Basılı Tut
      </button>
      <p className="time">{timeToDisplay} saniye </p>
    </div>
  )
}
