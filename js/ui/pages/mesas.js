var $canvas = $("#canvas");

if (!window.mesasState) {
  window.mesasState = {
    mesas: [],
    contadorMesa: 1,
    mesaSelecionada: null,
    x,
    y,
  };
}

var mesas = window.mesasState.mesas;
var contadorMesa = window.mesasState.contadorMesa;
var mesaSelecionada = window.mesasState.mesaSelecionada;
var x = window.mesasState.x;
var y = window.mesasState.y;

$(async function () {
  carregarMesas();
});

async function carregarMesas() {
  $canvas.empty();
  mesas.length = 0;

  const response = await RestaurantTablesController.getAll();

  response.data.forEach((mesa) => {
    criarMesaBanco(mesa);
  });

  contadorMesa = mesas.length + 1;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// ➕ adicionar mesa
$("#btn-add").on("click", function () {
  criarMesa(100, 100, `Mesa ${contadorMesa++}`);
});

// ❌ excluir
$("#btn-delet").on("click", function () {
  if (!mesaSelecionada) return;

  const id = $(mesaSelecionada).data("id");

  $(mesaSelecionada).remove();
  mesas = mesas.filter((m) => m.Id !== id);

  mesaSelecionada = null;
  hideShowButtons(false);
});

// ✏️ editar
$("#btn-edit").on("click", function () {
  if (!mesaSelecionada) return;

  const $mesa = $(mesaSelecionada);
  $mesa.find("span").hide();
  $mesa.find("input").show().focus().select();
});

// 💾 salvar
$("#btn-save").on("click", function (e) {
  e.preventDefault();

  console.log(JSON.stringify(mesas, null, 2));

  saveOrUpdate(mesas);
});

async function saveOrUpdate(mesas) {
  const response = await RestaurantTablesController.saveOrUpdate(mesas);

  if (response.success) {
    showToast(response.message);
  } else {
    showAlert({
      title: "Atenção",
      message: response.message,
    });
  }
}

// 🖱️ clicar fora
$canvas.on("click", function (e) {
  if ($(e.target).closest(".mesa").length) return;

  $(".mesa").removeClass("selected");
  mesaSelecionada = null;
  hideShowButtons(false);
});

function hideShowButtons(estate) {
  if (estate) {
    $("#btn-edit").show();
    $("#btn-delet").show();
  } else {
    $("#btn-edit").hide();
    $("#btn-delet").hide();
  }
}

function criarAuxiliares($mesa, Id) {
  // 🔥 selecionar
  $mesa.on("click", function () {
    if ($mesa[0]._isDragging) return;

    $(".mesa").removeClass("selected");
    $mesa.addClass("selected");
    mesaSelecionada = $mesa[0];

    hideShowButtons(true);
  });

  $mesa.on("dblclick", function () {
    if ($mesa[0]._isDragging) return;

    $(".mesa").removeClass("selected");
    $mesa.addClass("selected");
    mesaSelecionada = $mesa[0];

    const $el = $(this);

    $el.find("span").hide();
    $el.find("input").show().focus().select();

    hideShowButtons(true);
  });

  $mesa.find("input").on("blur", function () {
    const $input = $(this);
    const novoNome = $input.val().trim();

    // 🔥 pega nome antigo do objeto
    const mesaObj = mesas.find((m) => m.Id === Id);
    const nomeAntigo = mesaObj?.TableCode;

    // 🔥 tenta atualizar
    const atualizado = atualizarMesa(Id, { TableCode: novoNome });

    if (!atualizado) {
      // ❌ erro → volta nome antigo
      $input.val(nomeAntigo);
      $mesa.find("span").text(nomeAntigo).show();
    } else {
      // ✔️ sucesso
      $mesa.find("span").text(novoNome).show();
    }

    $input.hide();
    hideShowButtons(false);
  });

  $mesa.find("input").on("keydown", function (e) {
    if (e.key === "Enter") {
      $(this).blur();
      hideShowButtons(false);
    }
  });

  let offsetX = 0;
  let offsetY = 0;
  let isPointerDown = false;

  $mesa.on("pointerdown", function (e) {
    isPointerDown = true;
    $mesa[0]._isDragging = false;

    const rect = $mesa[0].getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    $mesa[0].setPointerCapture(e.pointerId);
  });

  $mesa.on("pointermove", function (e) {
    if (!isPointerDown) return;

    const rect = $canvas[0].getBoundingClientRect();

    x = e.clientX - rect.left - offsetX;
    y = e.clientY - rect.top - offsetY;

    if (
      Math.abs(x - $mesa[0].offsetLeft) > 2 ||
      Math.abs(y - $mesa[0].offsetTop) > 2
    ) {
      $mesa[0]._isDragging = true;
    }

    if (!$mesa[0]._isDragging) return;

    x = Math.max(0, Math.min(x, rect.width - 100));
    y = Math.max(0, Math.min(y, rect.height - 100));

    // 🔥 FORÇAR INTEIRO
    x = Math.round(x);
    y = Math.round(y);

    $mesa.css({ left: x, top: y });
  });

  $mesa.on("pointerup", function (e) {
    isPointerDown = false;

    setTimeout(() => {
      $mesa[0]._isDragging = false;
    }, 50);

    $mesa[0].releasePointerCapture(e.pointerId);

    atualizarMesa(Id, { X: x, Y: y });
  });

  $mesa.on("pointercancel", function () {
    isPointerDown = false;
    $mesa[0]._isDragging = false;
  });

  $canvas.append($mesa);
}

function criarMesaBanco(mesa) {
  const $mesa = $(`
        <div class="mesa">
            <span>${mesa.TableCode}</span>
            <input type="text" value="${mesa.TableCode}" style="display:none;" />
        </div>
    `);

  $mesa.css({ left: mesa.X, top: mesa.Y });
  $mesa.data("id", mesa.Id);

  criarAuxiliares($mesa, mesa.Id);

  mesas.push(mesa);
}

function criarMesa(X, Y, TableCode) {
  const Id = crypto.randomUUID();
  const QrToken = crypto.randomUUID();

  const $mesa = $(`
        <div class="mesa">
            <span>${TableCode}</span>
            <input type="text" value="${TableCode}" style="display:none;" />
        </div>
    `);

  $mesa.css({ left: X, top: Y });
  $mesa.data("id", Id);

  criarAuxiliares($mesa, Id);

  mesas.push({
    Id,
    X,
    Y,
    TableCode,
    QrToken,
  });
}

function atualizarMesa(id, dados) {

  const mesa = mesas.find(m => m.Id === id);
  if (!mesa) return false;

  if (dados.TableCode) {

    const novoNome = dados.TableCode.trim().toLowerCase();

    const existeDuplicado = mesas.some(m =>
      m.Id !== id &&
      m.TableCode?.trim().toLowerCase() === novoNome
    );

    if (existeDuplicado) {
      showAlert({
      title: "Atenção",
      message: "Já existe uma mesa com esse nome!",
    });
      return false; // ❌ falhou
    }
  }

  Object.assign(mesa, dados);
  return true; // ✔️ sucesso
}
