import { useState, useEffect } from "react";
import "./Artwork.scss";

const Artwork = ({ artwork, closeArtwork, nextArtwork, prevArtwork }) => {
  const [showAllReplies, setShowAllReplies] = useState(false);

  return (
    <div className="overlay">
      <div className="artwork-content">
        <div className="artwork-content--left">
          <img className="artwork-content__img" src={artwork.images[0]} />
        </div>
        <div className="artwork-content--right">
          <div className="artwork-content__talent-info">
            <div className="user-info">
              <img
                className="avt-m"
                src="https://www.imagelighteditor.com/img/bg-after.jpg"
                alt={`Avatar of ${artwork.talent.username}`}
              />
              <div className="user-info__name">
                <p className="user-info__name__fullname">
                  {artwork.talent.fullname
                    ? artwork.talent.fullname
                    : "Luu Quoc Nhat"}
                </p>
                <span className="user-info__name__username">
                  @{artwork.talent.username}
                </span>
              </div>
            </div>

            <img
              className="form-close-ic"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
              onClick={closeArtwork}
            />
          </div>
          <p className="artwork-content__desc">{artwork.description}</p>
          <hr />
          <div className="artwork-content__comment-container">
            <div className="artwork-content__comment-item">
              <div className="user-info">
                <img
                  className="avt-s"
                  src="https://www.imagelighteditor.com/img/bg-after.jpg"
                  alt={`Avatar of ${artwork.talent.username}`}
                />
              </div>
              <div className="artwork-content__comment-item__content">
                <div className="artwork-content__comment-item__content__details">
                  <p>Luu Quoc Nhat</p>
                  <p>Great work! Your drawing style ‘s so impressive.</p>
                </div>
                <div className="artwork-content__comment-item__content__extra">
                  <span>2h</span>
                  <span>Love</span>
                  <span>Reply</span>
                  <span>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                  </span>
                  <br />
                </div>
                <p className="view-replies-btn">
                  <span></span>View all 3 replies
                </p>

                {/*  Replies of each comment */}

                {setShowAllReplies && (
                  <div className="artwork-content__comment-item__content__reply-container">
                    <div className="artwork-content__comment-item__content__reply-item">
                      <div className="user-info">
                        <img
                          className="avt-xs"
                          src="https://www.imagelighteditor.com/img/bg-after.jpg"
                          alt={`Avatar of ${artwork.talent.username}`}
                        />
                      </div>

                      <div className="artwork-content__comment-item__content">
                        <div className="artwork-content__comment-item__content__details">
                          <p>Luu Quoc Nhat</p>
                          <p>
                            Great work! Your drawing style ‘s so impressive.
                          </p>
                        </div>
                        <div className="artwork-content__comment-item__content__extra">
                          <span>2h</span>
                          <span>Love</span>
                          <span>Reply</span>
                          <span>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                          </span>
                          <br />
                        </div>
                      </div>
                      <div className="artwork-content__comment-item__content">
                        <div className="artwork-content__comment-item__content__details">
                          <p>Luu Quoc Nhat</p>
                          <p>
                            Great work! Your drawing style ‘s so impressive.
                          </p>
                        </div>
                        <div className="artwork-content__comment-item__content__extra">
                          <span>2h</span>
                          <span>Love</span>
                          <span>Reply</span>
                          <span>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                          </span>
                          <br />
                        </div>
                      </div>
                      <div className="artwork-content__comment-item__content">
                        <div className="artwork-content__comment-item__content__details">
                          <p>Luu Quoc Nhat</p>
                          <p>
                            Great work! Your drawing style ‘s so impressive.
                          </p>
                        </div>
                        <div className="artwork-content__comment-item__content__extra">
                          <span>2h</span>
                          <span>Love</span>
                          <span>Reply</span>
                          <span>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                          </span>
                          <br />
                        </div>
                      </div>
                      <div className="artwork-content__comment-item__content">
                        <div className="artwork-content__comment-item__content__details">
                          <p>Luu Quoc Nhat</p>
                          <p>
                            Great work! Your drawing style ‘s so impressive.
                          </p>
                        </div>
                        <div className="artwork-content__comment-item__content__extra">
                          <span>2h</span>
                          <span>Love</span>
                          <span>Reply</span>
                          <span>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                          </span>
                          <br />
                        </div>
                      </div>
                      <div className="artwork-content__comment-item__content">
                        <div className="artwork-content__comment-item__content__details">
                          <p>Luu Quoc Nhat</p>
                          <p>
                            Great work! Your drawing style ‘s so impressive.
                          </p>
                        </div>
                        <div className="artwork-content__comment-item__content__extra">
                          <span>2h</span>
                          <span>Love</span>
                          <span>Reply</span>
                          <span>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                          </span>
                          <br />
                        </div>
                      </div>
                      <div className="artwork-content__comment-item__content">
                        <div className="artwork-content__comment-item__content__details">
                          <p>Luu Quoc Nhat</p>
                          <p>
                            Great work! Your drawing style ‘s so impressive.
                          </p>
                        </div>
                        <div className="artwork-content__comment-item__content__extra">
                          <span>2h</span>
                          <span>Love</span>
                          <span>Reply</span>
                          <span>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                          </span>
                          <br />
                        </div>
                      </div>
                      <div className="artwork-content__comment-item__content">
                        <div className="artwork-content__comment-item__content__details">
                          <p>Luu Quoc Nhat</p>
                          <p>
                            Great work! Your drawing style ‘s so impressive.
                          </p>
                        </div>
                        <div className="artwork-content__comment-item__content__extra">
                          <span>2h</span>
                          <span>Love</span>
                          <span>Reply</span>
                          <span>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                          </span>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="new-comment">
                <hr />
                <form className="comment-form">
                  <div className="form-field">
                    <input
                      type="text"
                      className="form-field__input"
                      placeholder="Share your thoughts"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="prev-artwork-btn"
        onClick={prevArtwork}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvt0jFqAmEQhuHHQwRMn4hnEMFbCKmFXCdYC97FCLmDjb2QQ4SBLAQLZ343Cxa77b+878w338TA32RgvlGQJvyQEU3xho90fJqPHPBPvOIdu0zSElHAj3jBGQtc/kvwhK9f+AmrCjzklQ0CHrHMEfAlvrPJu/dM0Ate2WBwQQzRS5JF1EV5feTyHaqCEP2tablJLYJOcsAMG+yzNrUKgveMNbYZvNKiCuPmP/ds0CQdBWlcg0f0A4wQHhnVdK5sAAAAAElFTkSuQmCC"
      />
      <img
        className="next-artwork-btn"
        onClick={nextArtwork}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALpJREFUSEvt08EJwkAQBdCXHgTvXuxBQdsRr4KdiHfBQgSxBkELEAVrkAWFKMTsBAMekvNk3s6f3ULLX9Fyfx1Qm/BfRbTEBpfaY5cKcieYY4UTJhEkF+jjgAHOGOGWM0kukHqVkeNzklokAryQHYbIQqJAQnrYl5Ax7lVx/QJIS6+MKgp8nv5r8zRVBEhLDuUfARrdoAgww/p5c6a45ryBCJBqF9hGXnEUyD30W11kyR3QKIHan1rfwQMvRiIZKJbEUwAAAABJRU5ErkJggg=="
      />
    </div>
  );
};

export default Artwork;
