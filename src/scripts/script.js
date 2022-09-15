import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";

function main() {
  const baseUrl =
    "https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json";

  const getData = () => {
    axios
      .get(`${baseUrl}`)
      .then((response) => {
        if (response.error) {
          showResponseMessage(
            response.message,
            "error",
            "Something went wrong!"
          );
        } else {
          renderAllDatas(response.data);
        }
      })
      .catch((error) => {
        showResponseMessage(error, "error", "Something went wrong!");
      });
  };

  const renderAllDatas = (datas) => {
    const daftarElement = document.querySelector(".daftar");
    daftarElement.innerHTML = "";

    datas.forEach((data) => {
      daftarElement.innerHTML += `
            <div class="col">
                <div class="card shadow-sm">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#1356c2"/>
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Q.S ${
                          data.name
                        }</text>
                        <text x="50%" y="65%" fill="#eceeef" dy=".3em">${
                          data.name_translations.ar
                        } - ${data.name_translations.id}</text>
                    </svg>

                    <div class="card-body">
                        <p class="card-text">Number of Surah : ${
                          data.number_of_surah
                        }</p>
                        <p class="card-text">Number of Ayah : ${
                          data.number_of_ayah
                        }</p>
                        <p class="card-text">Type of Surah : ${data.type}</p>

                        <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#${data.name
                          .split(" ")
                          .join("")
                          .replace(/[^\w\s]/gi, "")}">Play Audio</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="${data.name
              .split(" ")
              .join("")
              .replace(
                /[^\w\s]/gi,
                ""
              )}" tabindex="-1" aria-labelledby="${data.name
        .split(" ")
        .join("")
        .replace(/[^\w\s]/gi, "")}Label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="${data.name
                        .split(" ")
                        .join("")
                        .replace(/[^\w\s]/gi, "")}Label">${data.name}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <audio controls>
                    <source src="${data.recitation}" type="audio/mpeg">
                  </audio>
                  
                    </div>
                    
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fa-solid fa-xmark"></i>&nbsp; Close</button>
                    </div>
                  </div>
                </div>
              </div>
          `;
    });
  };

  const searchButton = $(".search-button");
  searchButton.on("click", (event) => {
    event.preventDefault();

    const searchInput = $("#search-button");
    const searchValue = parseInt(searchInput.val());
    const searchUrl = `https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${searchValue}.json`;

    if (!searchValue) {
      document.querySelector(".list").style.display = "none";
      document.querySelector(".album").style.display = "block";
    } else {
      document.querySelector(".list").style.display = "block";
      document.querySelector(".album").style.display = "none";

      axios
        .get(`${searchUrl}`)
        .then((response) => {
          if (response.error) {
            showResponseMessage(
              response.message,
              "error",
              "Something went wrong!"
            );
          } else {
            let arab = [];
            let terjemahan = [];
            response.data.verses.forEach((data) => {
              arab.push(data.text);
              terjemahan.push(data.translation_id);
            });
            const daftarElement = document.querySelector(".list");
            daftarElement.innerHTML = "";

            daftarElement.innerHTML += `
                <div class="card shadow-sm mt-lg-4">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#1356c2"/>
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Q.S ${
                          response.data.name
                        }</text>
                        <text x="50%" y="65%" fill="#eceeef" dy=".3em">${
                          response.data.name_translations.ar
                        } - ${response.data.name_translations.id}</text>
                    </svg>

                    <div class="card-body">
                        <p class="card-text">Number of Surah : ${
                          response.data.number_of_surah
                        }</p>
                        <p class="card-text">Number of Ayah : ${
                          response.data.number_of_ayah
                        }</p>
                        <p class="card-text">Type of Surah : ${
                          response.data.type
                        }</p>
                        <br>
                        <p class="card-text">Arab</p>
                        <p class="text-right">${arab.join("&nbsp,")}</p>
                        <br>
                        <p class="card-text">Terjemahan</p>
                        <p>${terjemahan.join("&nbsp")}</p>
                        <div class="d-flex justify-content-between align-items-center">
                    </div>
                </div>
            </div>
          `;
          }
        })
        .catch((error) => {
          showResponseMessage(error, "error", "Something went wrong!");
        });
    }
  });

  const showResponseMessage = (
    message = "Check your internet connection",
    icon,
    title
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: "#3085d6",
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    getData();
  });
}

export default main;
