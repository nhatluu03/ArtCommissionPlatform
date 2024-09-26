import { useState, useEffect, useRef, useContext } from "react";
import "./Menu.scss";
import { UserContext } from "../../contexts/user.context.jsx";

export default function Menu() {
  const { user, logout } = useContext(UserContext);

  const [menuContent, setMenuContent] = useState(true);
  const [appearanceMenu, setAppearanceMenu] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(false);

  const menuContentRef = useRef();
  const appearanceMenuRef = useRef();
  const languageContentRef = useRef();

  useEffect(() => {
    const toggleDisplayMenu = () => {
      console.log(menuContent)
      console.log(appearanceMenu)
      console.log(languageMenu)
      if (appearanceMenu) {
        appearanceMenuRef.current.classList.add("active");
        menuContentRef.current.classList.remove("active");
        languageContentRef.current.classList.remove("active");
        return;
      }

      if (languageMenu) {
        languageContentRef.current.classList.add("active");
        menuContentRef.current.classList.remove("active");
        appearanceMenuRef.current.classList.remove("active");
        return;
      }

      if (menuContent) {
        menuContentRef.current.classList.add("active");
        appearanceMenuRef.current.classList.remove("active");
        languageContentRef.current.classList.remove("active");
      }
    };
    toggleDisplayMenu();
  }, [appearanceMenu, menuContent, languageMenu]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="menu">
        {/* General Menu */}
        <div className="menu-content active" ref={menuContentRef}>
          <h4>Hi, {user.username}</h4>
          <div>nhat_luu@gmail.com</div>
          <div className="menu-container">
            <hr />
            <a
              href={`http://localhost:3000/users/${user?._id}`}
              className="menu-item"
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZxJREFUSEu11L1vjWEYx/HPSecmmgpCajHUaOofIF5K01EbU/8CidCkpoYNIQzduyojUukLo9UmBgtB21RIGQnPldxtTh7nPveTU+da7/v6fa/3lj5bq8/6mgImq0Bu4kQK6D3m8bwUYBPAHG5nhGZxvxukBDiPF9hAgFaS2DncwRGcwXoOUgKsJoFpPK6JTGEJy7jYK+AbDlRlGMTPmsgwtvEZx3oFbOIQDuJrBhB/olQdrVSiqPlZRDmeZEoUPbrQK6C9yTEx0ZOBBL2Lw/ttcgR2DSEWwu32u+pLQB/uZ0x3fUdxHTGev/Ayzf+7/7FoJY2u792aHOMZUY/hVJqmdrEtvMHrlM2PTqQcIKZiMTWxSQaxCzNYq3/uBJjAs/TxKW4hjtv3mnNkGMcv3sMnLAKLsd2zOmAIb1PkcWtuNAkf91I5v+BkNXk7u351wFU8wCucbige30InljIO35Vq8xdygDhol0rLkwGPp8P3CJdzgA8YQZSqXvNSQkfxCR9xPAf4kx5KNyoH+8e/V6FSNtkpauzY9GPfM/gL5dBHGcZ57nQAAAAASUVORK5CYII=" />
              <span className="title">Profile</span>
            </a>
            <div
              className="menu-item"
              onClick={() => {
                setAppearanceMenu(true);
              }}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAkBJREFUSEu11UvojlsUBvCfDjkSEqLcJnIpZ2SATBQpJZQiIYVyS0ghA0zkVoo4h1wyIClCGLkMhGOkxARJJwZCyDWSYy/tT6/X+30vg/+efN9+91rr2etZz1q7nTZe7do4vjqAPpiBsRiGgfgTn3Ab57AXT5pdtBXAVBxGt5os32El9lfZNQNYh03Z4T5O4Tqu4CX6YRbmYXC225wyC78fVhXAhmSxMVvtSwGX42OTLDpgLdajPbbm/XfzMsA4XMwB5ybej2fLPViCv7EU5f0UnM62s3G0gVAEiBs8SkWLwq7G9sKt/y/8D5/yPo7XJAFsSdQFpUMaNkWAaTiBe1kxXwpB6zII06ArLtgb43EpPhYBgo7pWIbdFTT8Sss06ncQC8oAkdog/IU7TWioAxme++MuhpYBXqML/kiqCHrKtNQFj/Nowg94g65lgOfokY2aybIIEsHGYBTepsIeS83WFzfxCt3LAP9hQFZAFLpVBtHlhxpBKlK7kBpzQhngLCYl9BXJcWeLGvTPUuyIbfg38R4KnJnpfZD3t8oAC/PguoHRLTKIzo2xcARz6gpTlGlnPEyBe2XHCFC1GtStSoXc8TsAYRvDKzT8LGcR6ZbXotRM/+B8prQlRtWwO5OUMBkv8u+1UoSeqYke43OWYrHjfwKrAuiUmu0kJuZCX84SDBE8xcg0Cq5mgJD1+1YptHpwFuc34ZueK9auPMp/m6KiQwSfjxjHI9K8j+yiXw5k8OJUrQSqe5PrRFJ73uYAXwELH3UZoHMS+gAAAABJRU5ErkJggg==" />
              <span className="title">Appearance</span>
            </div>
            <div className="menu-item"
              onClick={() => {
                setLanguageMenu(true);
              }}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAqxJREFUSEu11V3o33MUB/DXtDw0rJFNHppStqw8LFcj4UJMLlCY50V5KFtKtiLPccFcmMhDW8is1dZak6gVaVFSzAUT5QZjGuUhY8znvc5P3337/X5/F/t/bn79vufzOe9zzvt9zpliks+USfZvIoBDcAUuwuk4CXvxNT7Gm9iAv0YFOg7gYjxbTscl+iVuw5Zhl0YBPNgifaAe/IZpFeWZ+Buf4GAMbLl6N1b0QYYBxHEAfsYynI+rm8PHGsi95eBxLK/ybMaTOApL2+/TXZA+wKXYhN9xAb7Cd1X3E/BDPZ5ePByBExHbOzgU52LrAKQLkMtf4Nj2+Ca8jFvwYkUasrtnFRZXtg/Vm9XY3u6fhj9zuQtwe5H6Kc7AP3i9ynMz4rB7Btm+jwU4CNswr3F0WfOxsQ/wBhZiCVaWp88wtwBDbPck05QvXM0oQ4h+Ai802619gG+a4bieszxOvY/Bj0Nk+Esj+PCW+UzsxFn4sHokituvRCH2sAPU2T+VqvYDGERzIDDi68h+BmH/lF6JdmBWU9Lx+HYIcsp2dCnv+ybx+fgI4e7UPsBrTabX4E48U85yOY+ikqile0LsrpJj9J8ZdVeL/Cm8ghv7ANeXIWqJTHPSCze0BrujZfLcCJmmqc4p2+dN2nNaBle1DNb1AUJwypTOXNTkuRbR/0utdGtwbQ8g32PPWEmjXYdXq1nTaLv7APl/Id6qUXF2m5LhIFr/tYAj25yUJ5ykNKn1yViPqW1knIf3BsEMG3YZaI+W7u/BlbUPHu5M2Psr6g9qJ2RAppO7/O3DGDWu78MjFcVgJCflLJ28ybLJMvqjsgjBmaSDCfBfNcctnEvwfEl0XG9k4WQovjvs0kQrMzW+vGZUiJtdcswYj4TfrqG2Z1QEEwGMi/x/2SYd4F9DQooZvsQXDgAAAABJRU5ErkJggg==" />
              <span className="title">Language</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAn9JREFUSEu11V3ozmcYB/DPn+ZlyzjwNjLlXUrkhJNRnFBGO+FApuUtJ07Iy5EcbApH2wGLJE4kJKK1A9pwOCnUyLwuM02xZV5n96XrqZ9fz/P35OWup36/+3ff1/e6vt/vdT0d3vPqeM/xtQvwOTZhbCZ0Eatw/HUJtgtwGwNrwa5gxLsAmIqTGaiR0It8j28/dQbSrIJ5+BIX8CFWZICrGJbP1zA0n7/FE4zBbuyvAtYB5uAQr2jzGN9jM27m5U9Tg6XoXgkYlUWMI429KkBvXEa/cukbDMcMzMaZFjQERQfxI37DOtxNbR7EnSrA3Mz+HCbUAobAOzA5909jcQarHo274xGue1lFFeAznEAX7ESU/1+652wTFwVdkcg9dE0av8LzYopppfpTdYB4X1YCbcuUgqIoew8W4HBSEJ+3Yia2YzlG4hJCg0gsqn25mrnoIXriAzzD7yW7QRhQHPVn3gs3RR/cSDeF0I+K8P8U8F6duSi+hWu65e9p4foWBhfahuRznAkXXc/32O+Bf9sBqFIUWYb3d2FRUrQmg32NWalViB0dHQ6MtaQVRVWR96YeQVfY9jz615wVlYXIf5Ue+Si1C61C5LBvOO0VDb7AgWKxX4rFJtWChQYNm4azwiFR7Z3aubg7MXvnaB2gTzqh2mhTsLpM0X0tGi3Gyhb8nJqszd4IB/7dzEXRbNGZdXf9gJX4NYFi7nxXAk+vAXc6Khpn5xf/L0TM/D/K5obkOLjum4fu4+PMcmPph08wup1h14yJcSlyteLGuB5VcU9TFtv9wwnPh/erqzq+W0jUvJObHY4RHH+ZwX2sGGrrcaxl5PzQbgWvi/PWFbwxwP+LF34Zc4betQAAAABJRU5ErkJggg==" />
              <span className="title">Settings</span>
            </div>
            <hr />
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAohJREFUSEu11UvoVWUUBfDfX0UTI9CZJiU1SNBUAiVKyIlahpSG2SAFQUSiUDBESnugISIS+IJwoPhAchDiIy1oED7AgfhK0dIMcSooQiqJ9m3ZF47Hc+/Fwf+DC/ecs7+z1rfX2uv06OXV08vv1w1gAD7A2xiLEXiIf3Aah/AT/mtHtBPAO9icL+100MtYiN+aitoBfFOYfp0bruFHHMSZvDcO0/Ehhue9z7GuDtIE0Hr5bXyM/dmWJoJ9MAtbMRCLsL5aWAcIVvtwpzAeXzafz+KpWIHReX0W31baMgHHEIBv4WgLpArwLP7EUMzBzix6Izc3neB1nMgHi/E9Lhbhx7SErwJ8gk2lrxeSabgl1mHECcIxS5JlvGhynva9rOuf7gqCM7A37lcBfi5swjmfJlCL8RW8hJG4VBH5VF7H/db6Dl9gCxbUAa6XB8/jZfzdZQCDdTD8A69WaifiCAL8tTrAv+mEcMPdDgAxeLsQQxhsV1dqh+AGbmJwHSBsGUI/V3od/5tW+D9EjX6HNu/jXqUw9t7K/fH/MQ1C/VfSAefaAIT93iwnXFZOu6ahJtpyMo0yqg6wu1jsIyzF2jYA4az49W0zfMvLs5VFxx1Fx7l1gPD+dvyVjnnQRej6435lfsJxL2A29tQBQtxoUxTMKyG3rQGgNRtNEfNZxkQMawzaI23qhVPwS0NUtLDaAUSsHM8hnJRWfbSnicmXWJVuiLA70KFVkT3RjhisQcWicYqN1fp2cf1VhlnUXs24jkmPkAuLRujFsEWSDkvBI0k31Ml0+uC8W4Lvh5zuTnrHB2c+fm8q6vbJfKawnolpKdyLyTbcEn7/NSPjfjsG3QCe0qlPlvc6wP90M3sZlP5mAwAAAABJRU5ErkJggg==" />
              <span className="title">Help Center</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvt08FpAkEYhuHHg1iCgoEI1hFiHTYQsADbyMlL7vahSEgTCQgqpAmJDMyiRNk/WV0EcU8L+8/3zvfOTkPNT6PmfHdAaPg2Ff2EvfcDoYFTA7UD/lEgHg0rxhHlE1dRVPUM2hji9bDTpRR1MUcfL3grIJcApPB3POITT/guA5QpKjY0xhRNzHL4F56xiRRFgBEmSIEtPOT3Ada//6kqijr4QC+HLbOWo/D0vQogrUu7XmRAcn4y/BxAWpsabLEqu2pVG/z5gt8Boaod42wbGfdJKoYAAAAASUVORK5CYII=" />
              <span className="title">Terms & Policies</span>
            </div>
            <div className="menu-item" onClick={logout}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAM1JREFUSEvdlT0KwkAQRl/OIQhiobcJeA1bG2+gZ9BzeIbUNnaiIHgHG+UDN4ToOsvEVci2M/O9+UlmCjK/IrM+PweUwAqYOis7AAtgF+LbFVyAgVM8hB2BcQxwfxq8rXuJbwv1H7AB5sAtMiezRdZ8JVABM+D6xvkrAOlKXBDBms8EBAerEtnVJrVr23D+P8DKPGToblEKoNOQrR+t82dqAVIqlE+9Ifq3Ks7A0OqDYT8Bo9i61sFZAxMnZA8sPx0cp248zHtYkhPJDngAqgQ2GSwkQI0AAAAASUVORK5CYII=" />
              <span className="title">Logout</span>
            </div>
          </div>
        </div>

        {/* Appearance Menu */}
        <div className="sub-menu appearance" ref={appearanceMenuRef}>
          <div className="sub-menu__title">
            <img
              className="sub-menu__back-ic"
              onClick={() => {
                setMenuContent(true);
                setAppearanceMenu(false);
                setLanguageMenu(false);
              }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANJJREFUSEvl1EFqAkEQRuHPQwR0n4BnEEFPIWQteB1xLXgYBW/gwo17IYcIBVEamRmnOzMLcdY971X9XdUDPX+DnvneRzDEN9a5kbaJKOAHfGKFbY7kmSCFXzDBtStBCj9jlguPQuo6eIRP8ZNT+e1sleADx7/Mo/JieFUHAd9jjBPmpZVXdZDCS9JI/7knk0bUuyAqSCX/zr9uijqV1I1pZ5PUtMmd7ELOU1G0zc8EcU/RSezGF5bY5cxwG0HwRlhgkwNveotyObXn23ZQLHx9wS8QNSYZP6YqMAAAAABJRU5ErkJggg=="
            />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAkBJREFUSEu11UvojlsUBvCfDjkSEqLcJnIpZ2SATBQpJZQiIYVyS0ghA0zkVoo4h1wyIClCGLkMhGOkxARJJwZCyDWSYy/tT6/X+30vg/+efN9+91rr2etZz1q7nTZe7do4vjqAPpiBsRiGgfgTn3Ab57AXT5pdtBXAVBxGt5os32El9lfZNQNYh03Z4T5O4Tqu4CX6YRbmYXC225wyC78fVhXAhmSxMVvtSwGX42OTLDpgLdajPbbm/XfzMsA4XMwB5ybej2fLPViCv7EU5f0UnM62s3G0gVAEiBs8SkWLwq7G9sKt/y/8D5/yPo7XJAFsSdQFpUMaNkWAaTiBe1kxXwpB6zII06ArLtgb43EpPhYBgo7pWIbdFTT8Sss06ncQC8oAkdog/IU7TWioAxme++MuhpYBXqML/kiqCHrKtNQFj/Nowg94g65lgOfokY2aybIIEsHGYBTepsIeS83WFzfxCt3LAP9hQFZAFLpVBtHlhxpBKlK7kBpzQhngLCYl9BXJcWeLGvTPUuyIbfg38R4KnJnpfZD3t8oAC/PguoHRLTKIzo2xcARz6gpTlGlnPEyBe2XHCFC1GtStSoXc8TsAYRvDKzT8LGcR6ZbXotRM/+B8prQlRtWwO5OUMBkv8u+1UoSeqYke43OWYrHjfwKrAuiUmu0kJuZCX84SDBE8xcg0Cq5mgJD1+1YptHpwFuc34ZueK9auPMp/m6KiQwSfjxjHI9K8j+yiXw5k8OJUrQSqe5PrRFJ73uYAXwELH3UZoHMS+gAAAABJRU5ErkJggg==" />
            <span className="title">Appearance</span>
          </div>
          <hr />
          <div className="sub-menu-container appearance">
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAbxJREFUSEu11U+ITlEYBvDfkCysJEopmthbywYLlhbKnmYWIjHNkD8hhAgLMxvs7ZQdhZW1tbIzo0bIykL5c16dT7fTvd+5n745m9u5973Pc97nfd/nTFjhNbHC+EYhiNhf+UC9/+sdyN/DjI3gIhbwpZDwdyZZXbzfhCO4WUrelsF5XMM77MXHSp224DW24yxuNePbCLbiFSYxg7sVgrkM+j4f6EONIL5HylO4noMP4Rj25P1LzONp3p/DoxTzqY9EZcydnElbIpdT8a8My7DWRYfxJANczYWP7XFErWLtx4sukhrBW+zEadwrQAbN8BwHagTNHo/YAfFPrMJ6fCtANucO+4oNxZz8wxgAdRH8SIVe00EQjbCM71hXI+jK8E3Sd1cCiVa83SFRzEDMS+uq1eBgoxWjyA+wNk34CcxmxNA/6vBfBPHTsDa90JiVkQhC36PptDcag3YSu/P+GR4jnrGiox72HbRt2VvieQr3hw0SzmSTC6uISV9sxrfVINIOvcPs9iXLWKoQhNmFd+3oa3aBdyl7zecCvMuuN6aZmG6rR62LymzHduG0qTLWG60ie//Po0jUH7UR+QcpUk4ZRDtj1AAAAABJRU5ErkJggg==" />
              <span>Light</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAgZJREFUSEu11UuoTWEUB/Df9RwZIK8ICRlQIoryGCqFIaW8YuCRMKJEJiZeZaCQR5LHCJkoE2RE5DFAmUihFCWSKHtpndr3dPbd57j3rvra3977W+u/Hv+1vi79LF39bF8dwFhsyfUbkzt1qCeAHTiCIWn0I8b1BcBgXMeqNPYI8/AAi/sC4Bw24Ac24jPu4g6W9RZgBW7iD5bgYXp9D08wt7cAzzELh3AgjY1B5P8nRuNbJyDlIs/EC3zHBHwtGXqK2Zm6C/8LsBtHcRVrmoxsx0m8zIJHNG1JOYLT2IytONWkPRRvMR4Xsb4t63RrtBtYmetWCwMLcB+DEM5sQzRfj1KOIHK7DqtxrUIrUnceEdEr7EM4E6xrKWWAYM7+ZE/sq2QqLmN+HggyPMv9gCRDfJsY38oAC5P30bkN5SqQgdhb/DyI2DfL64IsM5oBAizCnp4dG51bJ1GPUQXDRmJEQe+zRXTTsAsnmgHiPfJ/BR8yivd1CKX/DSr/KlgYzfmvj1pN09tYXvRChBlFjSbrScLGzuyhqEGM9zMNhVYAw/EYU5IdkefDFUyZhEtYlAaPFaNkT9mbqvtgGI5jU4kpMa5j6L1BEGJppjG8/pJ9EentJnU3Wozn4H3cbFUSo3wtPrU6UAcQOsGUGHRz8hlpiboEneP5rq5AHRCl86PtRNC51ZLGX0IpXBnBPatbAAAAAElFTkSuQmCC" />
              <span>Dark</span>
            </div>
            <hr />
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKVJREFUSEvtlE0OQDAUhD/nkEjEgtu4jI0bcCEHsbETEvcgRBN/1SdNbei282Y603Y8HC/PMT+vCqRAASSWrhogA6qZZ+tgAHxLcjXeAtFRYFx3bWPb8WzJfgGV/x+R8SF/ICJjBkLA8seuPppw3gg7CfRAYByTATogPDqY27QEYhmHFlUD+VWbSngf99XT5nQioEh1Dm8PKXHgXEByN1qMxIGVwAR45SIZPNjn9AAAAABJRU5ErkJggg==" />
              <span>Default</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAehJREFUSEvV1MvLTWEYBfDfF5kiRK6lMFCSgUsuSWJKMVBymbiM/CtGLhlhQlEMzMj9UlIMFCkRBi6lpAwIe329R+ds+5yz++pL3jqdwbvftZ71POtZI8b5jIwzvn9GsBvbsQq/cAfncako3oH81jJa5ANcwLl6R+oKZuAstvZpXYgmYWWf+yvYj4+d+26CCbiNNfiAg7iHH9iAU5heHgbgAG5hYrk/gWkFYyN+5ttugkM4js9Yhre1KufiamnZZryr3c+v2voEU7AXZ+oEj7AC+3B6jO6KqpO4iajoUfC9yE0lb8ZIsBjP8R6z+hHMa2hPW74leFbeB6dHwX2sxp7ipLag3d8dxjFcxrY6wZFqQEfxqfL78oYhDiOcg6eYXP3vLHvRoyD+jooM+gXWl14OA879zGLPRdW7a9VixmWjp75oGUwckGG1JUnl1xHwDDg7kz1qJOhUkwVbWM3jZXlQ93znfcDvYkEBX1da/Ed1v7CL5CiJK16XzKmTdIOn9/F95tdzBqVpYiHZ00TSDf64ioxNJQH+mtewuA7JDSztUpLsibq05WEZ6Jd+ThhGkHdTC0ny6VVJ09nFcVvwdZDN2hB0SJK0UZITEyTSB4I32XRQMVFyEWnHLnxrsyBtFbTBavzm/yf4DTBuXhlUYzevAAAAAElFTkSuQmCC" />
              <span>Pink</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAdhJREFUSEvt1T3IjmEUB/Dfm4Ek+X4zYFBYDUgpeUcDiYUMLFKUMrAQpZQMSl6yYMDCQEopRSzylRGDkPL9NUiUj+vovG9Pj/t+nvsZ3jK4lvt0rnOd//+c+zr/q88Ir74Rzq8JwBKsQnznJqGHuIlzuN2JZCeAeTiFRV2qvIJNeF4VVwcwvzC+ikl4jUO4hweZJPYXYDsm4yWW4VE7SBXAbNzCFJzGVnyuqSIInMBKPMtqg9DwqgK4j2B4GNsaXoLzWI1LWNEJIJhcwBPMwY+GAOPyzNRs3d2hc+0VnME6bMbxUvZGHMjgnTiZdpV/L/bgIHbUAUQfZ5bk0wvIK7xBsIr1FtPSrvJHW6O9d7CwDuALxmIUfvYIMD4vw8e8fX8w2lv0K5GH/L20KI62n+8K0PAfD4f9B+jasX+zRX+xyjqq/I0rGI3vmFD0KO51rBl4kfYsPE17Ij5hDL7iW9qVcxCPR8hwjHqM/Jaiqkcy0cWSIOQiEu0vD83y9EfMUewqA7oPN7C0bpLXFpE7W/Er36fut259aJ3Ylo2BAnCtDiD8G5J5qOl1HEOo4yDW5MGQ52AeVSzG+iKSj4v67i46dLmVRZM3uTW+PyX8XdcL26Y5TeN7jvsNLMtnGXWolQMAAAAASUVORK5CYII=" />
              <span>Purple</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAltJREFUSEvV1UmoT2EYBvDfRSFTCkkWZEghc0mmFLIQKSXTQsaE2LOWDZlCLGRBUkRRpoyZSkhsjBsWIkIWxu+9fef2d+9/ugsLX51O55zve5/3fd73eU6Df7wa/nF8rQHogGH4hhf5XprfCPzAE/wuPtQCaIvNWIL+/JXQRWzLQXdm8Ih7C3PwLh6qAUTA4xhbJ41v0RldcACrqgGMw+V84D324ySe4RcGpe+T0/NijM7vhqMnruBquk+tBDAAt9ED13K5HytU0S5RdxgLE43PsQO7cAjLKwFcSoGn4Vhq5lJ8r0FRm1ztlJJ90YPT5QBiU5T4FX1RKfPmmL3xEL3wCsFCUNmiyTcxAduxqc7mxrZ+uI/uKbGDWFFuTIPPgo4x+UA9GO1xJw1B6KAY00iycZWOaYzY5/w+MqmXnqNYgDdpPPtkeiNWC4BoVgCECps2VCkhkouJWZvPzcKNzEJU1ajm5kK7jvGZyy81ggfXy7KSp+fM7+ZxHViugngXkl+H+Un6JyoAdM0Kn5n9aG4ajPNJN7tzNfuwphLAkazOBwg1h3mVriE4g8jwU2pu0BLeEwp+jY4Ymg2vRQ8mZeUWAffmjAoq12NrusJVH2N2nvnwnrOYiBjzuDet0h6E36xMAtmCCBZWcSo/70EkECu434joUewJekalMx/ynrDrsgBhUGFgI9EpVxN2Xayf2bbPYTDmYXUSZbc80jNwr3nfSisomlRleMp+Ch1sKPy/GkD4yYX844ifRZQaP5WXWJSaGVMTWglqHuFpNsTYU3HV+qO1tpoW+/9/gD9BgHcZxvbdfQAAAABJRU5ErkJggg==" />
              <span>Orange</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAjFJREFUSEu11UmozmEUBvDfNUsoZVZSMmYlMmQjlJUpZVgoFrKQkGzMQ1lQWLEQijJniJQpJTaWClnIkCQKIZn/R+e73e793/t9uu67+b7bfd7nec95nnO+Om186tqY3/8U6IJxmIARWBaPrybQCdMxB2MxAD2Lyy/wCr/RGYPRrwHfD3SsJjAf+9C/xjZ+xlOMRHt0wM+yCuJFBwvwkiS+Xbz+Eu4kwRv0waj8f4X4bf79JasKkdIWHcByxMVVOFRjBQHrihD4mK1sIjAcj5JwDB40IG+HKZiNSRiEvtmKCmwonuBxGt1EYA324BamNiAfj6N56Vth6mFcz7a9boCbi7O4iFllLTqFMHdhQXYiL27Etvwepm/Hu2bathtrE7+5TOB8Kkee72NpevC9KH0xTlfxI1o6GjNwrUzgXGY++h85vpdBmImbVcgnFsR3EWkaiGhlEw/OYB4WYXVO5tYCuKWGJN1I33ZiQwXfeA5WYj9eZko+5OenKgIxM0fwtQjDENQb31ggcvwMvZNwb1bSEn/ENiqPwdqUIajHl03yeuxKRL1ZJQrdixnYUSQqqg6eC+lf7KcWBaL/xxPxvtgtJ9PgWBE9EMM4uZiBaeiWuGO5Pf8aW00gXh9VRBp6FZmOCW7uPMcKXGkOUNaiAEcs16VxCzLbsRqiLXHCxKjsciWO/yLwMFdCiFytIZ4tQsoqiNfFEhuWi6tVGmUCvzIVYWCs3ladaj+ZrSKPy20u8AcQp2YZQ+qvigAAAABJRU5ErkJggg==" />
              <span>Green</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAK5JREFUSEvt1TEOAUEYBeBvExFnIBIu4R4KoXAIJ1BTOIEelcI5XEHvDgoyspKxYdcWW0hm2jfvvZn3//9MpuGVNawvGVQmHEd0wREbXHNmHwuMccOpJv5Wg3suGoymaOGAQeGYAZ+gXYLPcA68+AajnDD8ItjBrsJwjxf/qV3soi7WmOcmWyyjyHpYleAx/6NBZdHqbkhFDonFXZWKnCaZ/57kuq/AT/vTl1kZ0wPiDFoZO0u5igAAAABJRU5ErkJggg==" />
              <span>Blue</span>
            </div>
          </div>
        </div>

        {/* Language Menu */}
        <div className="sub-menu language" ref={languageContentRef}>
          <div className="sub-menu__title">
            <img
              className="sub-menu__back-ic"
              onClick={() => {
                setMenuContent(true);
                setAppearanceMenu(false);
                setLanguageMenu(false);
              }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANJJREFUSEvl1EFqAkEQRuHPQwR0n4BnEEFPIWQteB1xLXgYBW/gwo17IYcIBVEamRmnOzMLcdY971X9XdUDPX+DnvneRzDEN9a5kbaJKOAHfGKFbY7kmSCFXzDBtStBCj9jlguPQuo6eIRP8ZNT+e1sleADx7/Mo/JieFUHAd9jjBPmpZVXdZDCS9JI/7knk0bUuyAqSCX/zr9uijqV1I1pZ5PUtMmd7ELOU1G0zc8EcU/RSezGF5bY5cxwG0HwRlhgkwNveotyObXn23ZQLHx9wS8QNSYZP6YqMAAAAABJRU5ErkJggg=="
            />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAkBJREFUSEu11UvojlsUBvCfDjkSEqLcJnIpZ2SATBQpJZQiIYVyS0ghA0zkVoo4h1wyIClCGLkMhGOkxARJJwZCyDWSYy/tT6/X+30vg/+efN9+91rr2etZz1q7nTZe7do4vjqAPpiBsRiGgfgTn3Ab57AXT5pdtBXAVBxGt5os32El9lfZNQNYh03Z4T5O4Tqu4CX6YRbmYXC225wyC78fVhXAhmSxMVvtSwGX42OTLDpgLdajPbbm/XfzMsA4XMwB5ybej2fLPViCv7EU5f0UnM62s3G0gVAEiBs8SkWLwq7G9sKt/y/8D5/yPo7XJAFsSdQFpUMaNkWAaTiBe1kxXwpB6zII06ArLtgb43EpPhYBgo7pWIbdFTT8Sss06ncQC8oAkdog/IU7TWioAxme++MuhpYBXqML/kiqCHrKtNQFj/Nowg94g65lgOfokY2aybIIEsHGYBTepsIeS83WFzfxCt3LAP9hQFZAFLpVBtHlhxpBKlK7kBpzQhngLCYl9BXJcWeLGvTPUuyIbfg38R4KnJnpfZD3t8oAC/PguoHRLTKIzo2xcARz6gpTlGlnPEyBe2XHCFC1GtStSoXc8TsAYRvDKzT8LGcR6ZbXotRM/+B8prQlRtWwO5OUMBkv8u+1UoSeqYke43OWYrHjfwKrAuiUmu0kJuZCX84SDBE8xcg0Cq5mgJD1+1YptHpwFuc34ZueK9auPMp/m6KiQwSfjxjHI9K8j+yiXw5k8OJUrQSqe5PrRFJ73uYAXwELH3UZoHMS+gAAAABJRU5ErkJggg==" />
            <span className="title">Language</span>
          </div>
          <hr />
          <div className="sub-menu-container">
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAbxJREFUSEu11U+ITlEYBvDfkCysJEopmthbywYLlhbKnmYWIjHNkD8hhAgLMxvs7ZQdhZW1tbIzo0bIykL5c16dT7fTvd+5n745m9u5973Pc97nfd/nTFjhNbHC+EYhiNhf+UC9/+sdyN/DjI3gIhbwpZDwdyZZXbzfhCO4WUrelsF5XMM77MXHSp224DW24yxuNePbCLbiFSYxg7sVgrkM+j4f6EONIL5HylO4noMP4Rj25P1LzONp3p/DoxTzqY9EZcydnElbIpdT8a8My7DWRYfxJANczYWP7XFErWLtx4sukhrBW+zEadwrQAbN8BwHagTNHo/YAfFPrMJ6fCtANucO+4oNxZz8wxgAdRH8SIVe00EQjbCM71hXI+jK8E3Sd1cCiVa83SFRzEDMS+uq1eBgoxWjyA+wNk34CcxmxNA/6vBfBPHTsDa90JiVkQhC36PptDcag3YSu/P+GR4jnrGiox72HbRt2VvieQr3hw0SzmSTC6uISV9sxrfVINIOvcPs9iXLWKoQhNmFd+3oa3aBdyl7zecCvMuuN6aZmG6rR62LymzHduG0qTLWG60ie//Po0jUH7UR+QcpUk4ZRDtj1AAAAABJRU5ErkJggg==" />
              <span>EN</span>
            </div>
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAgZJREFUSEu11UuoTWEUB/Df9RwZIK8ICRlQIoryGCqFIaW8YuCRMKJEJiZeZaCQR5LHCJkoE2RE5DFAmUihFCWSKHtpndr3dPbd57j3rvra3977W+u/Hv+1vi79LF39bF8dwFhsyfUbkzt1qCeAHTiCIWn0I8b1BcBgXMeqNPYI8/AAi/sC4Bw24Ac24jPu4g6W9RZgBW7iD5bgYXp9D08wt7cAzzELh3AgjY1B5P8nRuNbJyDlIs/EC3zHBHwtGXqK2Zm6C/8LsBtHcRVrmoxsx0m8zIJHNG1JOYLT2IytONWkPRRvMR4Xsb4t63RrtBtYmetWCwMLcB+DEM5sQzRfj1KOIHK7DqtxrUIrUnceEdEr7EM4E6xrKWWAYM7+ZE/sq2QqLmN+HggyPMv9gCRDfJsY38oAC5P30bkN5SqQgdhb/DyI2DfL64IsM5oBAizCnp4dG51bJ1GPUQXDRmJEQe+zRXTTsAsnmgHiPfJ/BR8yivd1CKX/DSr/KlgYzfmvj1pN09tYXvRChBlFjSbrScLGzuyhqEGM9zMNhVYAw/EYU5IdkefDFUyZhEtYlAaPFaNkT9mbqvtgGI5jU4kpMa5j6L1BEGJppjG8/pJ9EentJnU3Wozn4H3cbFUSo3wtPrU6UAcQOsGUGHRz8hlpiboEneP5rq5AHRCl86PtRNC51ZLGX0IpXBnBPatbAAAAAElFTkSuQmCC" />
              <span>VI</span>
            </div>
            <hr />
            <div className="menu-item">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKVJREFUSEvtlE0OQDAUhD/nkEjEgtu4jI0bcCEHsbETEvcgRBN/1SdNbei282Y603Y8HC/PMT+vCqRAASSWrhogA6qZZ+tgAHxLcjXeAtFRYFx3bWPb8WzJfgGV/x+R8SF/ICJjBkLA8seuPppw3gg7CfRAYByTATogPDqY27QEYhmHFlUD+VWbSngf99XT5nQioEh1Dm8PKXHgXEByN1qMxIGVwAR45SIZPNjn9AAAAABJRU5ErkJggg==" />
              <span>FR</span>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}
