import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Note from "./components/Note";
import { useEffect, useState } from "react";

const themes = {
  default: "default",
  cute: "cute",
  hacker: "hacker",
  sleek: "sleek",
  pride: "pride",
};

const APP_CONTAINER =
  "container min-h-full min-w-full absolute left-0 right-0 top-0 bottom-0 flex flex-row justify-center items-center py-16 ";

const CONTENT_CONTAINER =
  "container w-full md:w-4/5 lg:w-3/5 h-4/5 px-4 mx-4 flex flex-col shadow-xl ";

const THEME_CONTAINER =
  "h-20 w-20 hover:cursor-pointer hover:opacity-80 hover:shadow-xl shadow rounded flex justify-center items-center m-4 transition duration-200 ease-in-out ";

const styles = {
  appContainer: {
    default: APP_CONTAINER + "bg-gray-700",
    cute: APP_CONTAINER + "bg-red-400",
    hacker: APP_CONTAINER + "bg-black",
    sleek: APP_CONTAINER + "bg-yellow-900",
    pride:
      APP_CONTAINER + "bg-gradient-to-r from-blue-600 via-pink-600 to-red-600",
  },
  contentContainer: {
    default: CONTENT_CONTAINER + "bg-gray-50 rounded",
    cute: CONTENT_CONTAINER + "bg-red-100 rounded",
    hacker: CONTENT_CONTAINER + "border-2 border-white",
    sleek: CONTENT_CONTAINER + "bg-yellow-100 rounded-lg",
    pride: CONTENT_CONTAINER + "bg-white rounded-xl",
  },
};

function App() {
  const [theme, setTheme] = useState(themes.default);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    console.log(`THEME: ${theme}`);
  }, [theme]);

  const selectTheme = (selected) => setTheme(themes[selected]);

  if (!theme) return null;
  else
    return (
      <BrowserRouter>
        <div className={styles.appContainer[theme]}>
          <div className={styles.contentContainer[theme]}>
            <Switch>
              <Route
                path="/"
                exact={true}
                render={(props) => <Home {...props} theme={theme} />}
              />
              <Route
                path="/editor/:notetitle?"
                render={(props) => <Editor {...props} theme={theme} />}
              />
              <Route
                path="/note/:title"
                render={(props) => <Note {...props} theme={theme} />}
              />
            </Switch>
          </div>
          {showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <div className="relative w-full md:w-3/5 lg:w-2/5 mx-6 my-6">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="p-5 border-b border-solid border-gray-300 rounded-t">
                      <h3 className="text-3xl font-semibold">Select a theme</h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex flex-row flex-wrap w-full justify-evenly">
                      <div
                        onClick={() => selectTheme("default")}
                        className={THEME_CONTAINER + "bg-gray-700"}
                      >
                        <p className="font-sans text-white text-lg">Default</p>
                      </div>
                      <div
                        onClick={() => selectTheme("cute")}
                        className={THEME_CONTAINER + "bg-red-200"}
                      >
                        <p className="font-sans text-red-700 text-lg">Cute</p>
                      </div>
                      <div
                        onClick={() => selectTheme("hacker")}
                        className={THEME_CONTAINER + "bg-black"}
                      >
                        <p className="font-mono text-green text-lg">Hacker</p>
                      </div>
                      <div
                        onClick={() => selectTheme("sleek")}
                        className={THEME_CONTAINER + "bg-yellow-200"}
                      >
                        <p className="font-serif text-yellow-900 text-lg">
                          Sleek
                        </p>
                      </div>
                      <div
                        onClick={() => selectTheme("pride")}
                        className={
                          THEME_CONTAINER +
                          "bg-gradient-to-r from-blue-600 via-pink-600 to-red-600"
                        }
                      >
                        <p className="font-sans font-bold text-white text-lg">
                          Pride
                        </p>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b">
                      <button
                        className="text-red-600 rounded font-medium px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 transition duration-500 ease-in-out hover:bg-red-200 hover:bg-opacity-30"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          <button
            onClick={() => setShowModal(true)}
            className="absolute bg-white h-10 w-10 bottom-10 left-10 rounded-full pb-2 shadow-lg hover:bg-gray-100 focus:outline-none"
          >
            ...
          </button>
        </div>
      </BrowserRouter>
    );
}

export default App;
