(function() {

	var parent = document.querySelector("#rangeSlider");
	if(!parent) return;

	var
	rangeS = parent.querySelectorAll("input[type=range]"),
	numberS = parent.querySelectorAll("input[type=number]");

	rangeS.forEach(function(el) {
		el.oninput = function() {
			var slide1 = parseFloat(rangeS[0].value),
				slide2 = parseFloat(rangeS[1].value);

			if (slide1 > slide2) {
				[slide1, slide2] = [slide2, slide1];
				// var tmp = slide2;
				// slide2 = slide1;
				// slide1 = tmp;
			}

			numberS[0].value = slide1;
			numberS[1].value = slide2;
		}
	});

	numberS.forEach(function(el) {
		el.oninput = function() {
			var number1 = parseFloat(numberS[0].value),
				number2 = parseFloat(numberS[1].value);

			if (number1 > number2) {
				var tmp = number1;
				numberS[0].value = number2;
				numberS[1].value = tmp;
			}

			rangeS[0].value = number1;
			rangeS[1].value = number2;

		}
	});

})();




//Calculos

let resultadoVariavel;
let resultadoVariavel2;
let scoreGlobal;
let scoreLD;
let PontuacaoGL;
let PontuacaoLD;
let probabilidadeSobrevidaGlobal1Ano;
let probabilidadeSobrevidaGlobal3Anos;
let probabilidadeSobrevidaGlobal5Anos;
let probabilidadeSobrevidaLD1Ano;
let probabilidadeSobrevidaLD3Anos;
let probabilidadeSobrevidaLD5Anos;

// Função para exibir o valor da variável no HTML
function exibirResultado() {
	// Exibe o valor armazenado na variável
	const resultadoVarContainer = document.getElementById('resultado-var');
	resultadoVarContainer.innerHTML = `AJCC Global: ${resultadoVariavel}<br>AJCC Livre Doença: ${resultadoVariavel2}
	<br>Score Global: ${scoreGlobal} <br>Score Livre Doença: ${scoreLD}
	<br>Soma Variável 1 e Score Global: ${PontuacaoGL};
	<br>Probabilidade de Sobrevida Global 1 Ano: ${probabilidadeSobrevidaGlobal1Ano}
	<br>Probabilidade de Sobrevida Global 3 Anos: ${probabilidadeSobrevidaGlobal3Anos}
	<br>Probabilidade de Sobrevida Global 5 Anos: ${probabilidadeSobrevidaGlobal5Anos}
	<br>Probabilidade de Sobrevida Global 5 Anos: ${probabilidadeSobrevidaLD1Ano}
	<br>Probabilidade de Sobrevida Global 5 Anos: ${probabilidadeSobrevidaLD3Anos}
	<br>Probabilidade de Sobrevida Global 5 Anos: ${probabilidadeSobrevidaLD5Anos}`;
}

// Slider HTML com o id :
const locationRangeSlider = document.getElementById('location-range-slider');
const locationRangeSlider2 = document.getElementById('location-range-slider-2');
const scoreSlider1 = document.getElementById('score-slider1');
const scoreSlider2 = document.getElementById('score-slider2');
const scoreValueLD = document.getElementById('score');
const scoreInput = document.getElementById('pontuacaoTotal');
const scoreValueGL = document.getElementById('scoreGL');
const scoreInputGL = document.getElementById('pontuacaoTotalGL');

const scoreCircle = document.getElementById('scoreCircle');


// evento de input ao primeiro slider para monitorar mudanças
locationRangeSlider.addEventListener('input', function () {
	atualizarValores();

});

// evento de input ao segundo slider para monitorar mudanças
locationRangeSlider2.addEventListener('input', function () {
	atualizarValores();

});

scoreSlider2.addEventListener('input', function(){
	atualizarValores();

});

scoreValueLD.addEventListener('input', function(){
	atualizarValores();

});

scoreInput.addEventListener('input', function(){
	atualizarValores();

});

scoreInputGL.addEventListener('input', function(){
	atualizarValores();

});


scoreCircle.addEventListener('input', function(){
	atualizarValores();


})

// Função para atualizar a posição do slider com base em PontuacaoLD
function atualizarSliderPontuacaoLD() {
    const pontuacaoLDSlider = document.getElementById('score-slider2');
    pontuacaoLDSlider.value = PontuacaoLD;

}

function atualizarSliderPontuacaoGL() {
    const pontuacaoGLSlider = document.getElementById('score-slider1');
    pontuacaoGLSlider.value = PontuacaoGL;
}


function atualizarValorScoreNumerico(){
	const pontuacaoAtualSpan = document.getElementById('score');
	const pontuacaoAtualSpan2 = document.getElementById('pontuacaoTotal');
	const pontuacaoAtualSpanGL = document.getElementById('scoreGL');
	const pontuacaoAtualSpanGL2 = document.getElementById('pontuacaoTotalGL');

	const pontuacaoCircle1 = document.getElementById('scoreCircle');
	const pontuacaoCircle1B = document.getElementById('pontuacaoCircle');
	pontuacaoCircle1.value = probFSGL1;
	pontuacaoCircle1B.innerText =probFSGL1;

	const probGL3anos = document.getElementById("scoreCircle3");
	const probGL3anosB = document.getElementById('pontuacaoCircle3');
	probGL3anos.value = probFSGL3;
	probGL3anosB.innerText = probFSGL3;

	const probGL5anos = document.getElementById("scoreCircle5");
	const probGL5anosB = document.getElementById('pontuacaoCircle5');
	probGL5anos.value = probFSGL5;
	probGL5anosB.innerText = probFSGL5;

	const probLD1ano = document.getElementById("scoreCircleLD");
	const probLD1anoB = document.getElementById('pontuacaoCircleLD');
	probLD1ano.value = probLD1;
	probLD1anoB.innerText = probLD1;

	const probLD3anos = document.getElementById("scoreCircleLD3");
	const probLD3anosB = document.getElementById('pontuacaoCircleLD3');
	probLD3anos.value = probLD3;
	probLD3anosB.innerText = probLD3;

	const probLD5anos = document.getElementById("scoreCircleLD5");
	const probLD5anosB = document.getElementById('pontuacaoCircleLD5');
	probLD5anos.value = probLD5;
	probLD5anosB.innerText = probLD5;

	pontuacaoAtualSpan.value = PontuacaoLD;
	pontuacaoAtualSpan2.innerText = PontuacaoLD;
	pontuacaoAtualSpanGL.value = PontuacaoGL;
	pontuacaoAtualSpanGL2.innerText = PontuacaoGL;

}

function atualizarValores() {
	// Obtém o valor atual dos sliders
	const ajccValue = parseInt(locationRangeSlider.value);
	const score = parseInt(locationRangeSlider2.value);

	// Aplica a lógica de cálculo com base nos valores dos sliders = ALTERADO PARA NOVO MODELO 
	if (ajccValue === 1) {
		resultadoVariavel = 0;
		resultadoVariavel2 = 0;
	} else if (ajccValue === 2) {
		resultadoVariavel = 37;
		resultadoVariavel2 = 43;
	} else if (ajccValue === 3) {
		resultadoVariavel = 45;
		resultadoVariavel2 = 46;
	} else if (ajccValue === 4) {
		resultadoVariavel = 65;
		resultadoVariavel2 = 93;
		} else if (ajccValue === 5) {
		resultadoVariavel = 100;
		resultadoVariavel2 = 100;
	} else {
		resultadoVariavel = " ";
		resultadoVariavel2 = " ";
	}

	if (score === 1) {
		scoreGlobal = 0;
		scoreLD = 0;
	} else if (score === 2) {
		scoreGlobal = 88;
		scoreLD = 78;
	} else {
		scoreGlobal = " ";
		scoreLD = " ";
	}
 
	
	function calcularProbabilidadeSobrevida1(PontuacaoGL) {
		if (PontuacaoGL < 48) {
			return 0.975;
		} else if (PontuacaoGL === 48) {
			return 0.95;
		} else if (PontuacaoGL > 48 && PontuacaoGL < 103) {
			return 0.925;
		} else if (PontuacaoGL === 103) {
			return 0.90;
		} else if (PontuacaoGL > 103 && PontuacaoGL < 160) {
			return 0.85;
		} else if (PontuacaoGL === 160) {
			return 0.80;
		} else if (PontuacaoGL > 160 && PontuacaoGL < 196) {
			return 0.75;
		} else if (PontuacaoGL === 196) {
			return 0.70;
		} else if (PontuacaoGL > 196) {
			return 0.35;
		} else {
			return " ";
		}
	}

	function calcularProbabilidadeSobrevida3(PontuacaoGL) {
		if (PontuacaoGL < 23) {
			return 0.95;
		} else if (PontuacaoGL === 23) {
			return 0.90;
		} else if (PontuacaoGL > 23 && PontuacaoGL < 80) {
			return 0.85;
		} else if (PontuacaoGL === 80) {
			return 0.80;
		} else if (PontuacaoGL > 80 && PontuacaoGL < 116) {
			return 0.75;
		} else if (PontuacaoGL === 116) {
			return 0.70;
		} else if (PontuacaoGL > 116 && PontuacaoGL < 143) {
			return 0.65;
		} else if (PontuacaoGL === 143) {
			return 0.60;
		} else if (PontuacaoGL > 143 && PontuacaoGL < 166) {
			return 0.55;
		} else if (PontuacaoGL === 166) {
			return 0.50;
		} else if (PontuacaoGL > 166 && PontuacaoGL < 187) {
			return 0.45;
		} else if (PontuacaoGL === 187) {
			return 0.40;
		} else if (PontuacaoGL > 187) {
			return 0.20;
		} else {
			return " ";
		}
	}

	function calcularProbabilidadeSobrevida5(PontuacaoGL) {
		if (PontuacaoGL < 35) {
			return 0.90;
		} else if (PontuacaoGL === 35) {
			return 0.80;
		} else if (PontuacaoGL > 35 && PontuacaoGL < 71) {
			return 0.75;
		} else if (PontuacaoGL === 71) {
			return 0.70;
		} else if (PontuacaoGL > 71 && PontuacaoGL < 99) {
			return 0.65;
		} else if (PontuacaoGL === 99) {
			return 0.60;
		} else if (PontuacaoGL > 99 && PontuacaoGL < 122) {
			return 0.55;
		} else if (PontuacaoGL === 122) {
			return 0.50;
		} else if (PontuacaoGL > 122 && PontuacaoGL < 143) {
			return 0.45;
		} else if (PontuacaoGL === 143) {
			return 0.40;
		} else if (PontuacaoGL > 143 && PontuacaoGL < 164) {
			return 0.35;
		} else if (PontuacaoGL === 164) {
			return 0.30;
		} else if (PontuacaoGL > 164 && PontuacaoGL < 186) {
			return 0.25;
		} else if (PontuacaoGL === 186) {
			return 0.20;
		} else if (PontuacaoGL > 186) {
			return 0.10;
		} else {
			return " ";
		}
	}

	function calcularProbabilidadeSobrevidaLD1(PontuacaoLD) {
		if (PontuacaoLD < 17) {
			return 0.975;
		} else if (PontuacaoLD === 17) {
			return 0.95;
		} else if (PontuacaoLD > 17 && PontuacaoLD < 65) {
			return 0.925;
		} else if (PontuacaoLD === 65) {
			return 0.90;
		} else if (PontuacaoLD > 65 && PontuacaoLD < 114) {
			return 0.85;
		} else if (PontuacaoLD === 114) {
			return 0.80;
		} else if (PontuacaoLD > 114 && PontuacaoLD < 145) {
			return 0.75;
		} else if (PontuacaoLD === 145) {
			return 0.70;
		} else if (PontuacaoLD > 145 && PontuacaoLD < 169) {
			return 0.65;
		} else if (PontuacaoLD === 169) {
			return 0.60;
		} else if (PontuacaoLD > 169) {
			return 0.30;
		} else {
			return " ";
		}
	}

	function calcularProbabilidadeSobrevidaLD3(PontuacaoLD) {
		if (PontuacaoLD < 1) {
			return 0.95;
		} else if (PontuacaoLD === 7) {
			return 0.90;
		} else if (PontuacaoLD > 1 && PontuacaoLD < 51) {
			return 0.85;
		} else if (PontuacaoLD === 51) {
			return 0.80;
		} else if (PontuacaoLD > 51 && PontuacaoLD < 81) {
			return 0.75;
		} else if (PontuacaoLD === 81) {
			return 0.70;
		} else if (PontuacaoLD > 81 && PontuacaoLD < 105) {
			return 0.65;
		} else if (PontuacaoLD === 105) {
			return 0.60;
		} else if (PontuacaoLD > 105 && PontuacaoLD < 125) {
			return 0.55;
		} else if (PontuacaoLD === 125) {
			return 0.50;
		} else if (PontuacaoLD > 125 && PontuacaoLD < 144) {
			return 0.45;
		} else if (PontuacaoLD === 144) {
			return 0.40;
		} else if (PontuacaoLD > 144 && PontuacaoLD < 161) {
			return 0.35;
		} else if (PontuacaoLD === 161) {
			return 0.30;
		} else if (PontuacaoLD > 161) {
			return 0.15;
		} else {
			return " ";
		}
	}

	function calcularProbabilidadeSobrevidaLD5(PontuacaoLD) {
		if (PontuacaoLD < 20) {
			return 0.90;
		} else if (PontuacaoLD === 20) {
			return 0.80;
		} else if (PontuacaoLD > 20 && PontuacaoLD < 51) {
			return 0.75;
		} else if (PontuacaoLD === 51) {
			return 0.70;
		} else if (PontuacaoLD > 51 && PontuacaoLD < 75) {
			return 0.65;
		} else if (PontuacaoLD === 75) {
			return 0.60;
		} else if (PontuacaoLD > 75 && PontuacaoLD < 95) {
			return 0.55;
		} else if (PontuacaoLD === 95) {
			return 0.50;
		} else if (PontuacaoLD > 95 && PontuacaoLD < 113) {
			return 0.45;
		} else if (PontuacaoLD === 113) {
			return 0.40;
		} else if (PontuacaoLD > 113 && PontuacaoLD < 131) {
			return 0.35;
		} else if (PontuacaoLD === 131) {
			return 0.30;
		} else if (PontuacaoLD > 131 && PontuacaoLD < 150) {
			return 0.25;
		} else if (PontuacaoLD === 150) {
			return 0.20;
		} else if (PontuacaoLD > 150 && PontuacaoLD < 174) {
			return 0.15;
		} else if (PontuacaoLD === 174) {
			return 0.10;
		} else if (PontuacaoLD > 174) {
			return 0.05;
		} else {
			return " ";
		}
	}

	// Calcula a soma da Variável 1 e do Score Global
	PontuacaoGL = resultadoVariavel + scoreGlobal;
	PontuacaoLD = resultadoVariavel2 + scoreLD;

	// Calcula a probabilidade de sobrevida global 1 ano
	probabilidadeSobrevidaGlobal1Ano = calcularProbabilidadeSobrevida1(PontuacaoGL);
	// Calcula a probabilidade de sobrevida global 3 anos
	probabilidadeSobrevidaGlobal3Anos = calcularProbabilidadeSobrevida3(PontuacaoGL);
	// Calcula a probabilidade de sobrevida global 5 anos
	probabilidadeSobrevidaGlobal5Anos = calcularProbabilidadeSobrevida5(PontuacaoGL);
	// Calcula a probabilidade de sobrevida livre de doença 1 ano
	probabilidadeSobrevidaLD1Ano = calcularProbabilidadeSobrevidaLD1(PontuacaoLD);
	// Calcula a probabilidade de sobrevida livre de doença 3 anos
	probabilidadeSobrevidaLD3Anos = calcularProbabilidadeSobrevidaLD3(PontuacaoLD);
	// Calcula a probabilidade de sobrevida livre de doença 5 anos
	probabilidadeSobrevidaLD5Anos = calcularProbabilidadeSobrevidaLD5(PontuacaoLD);

	probFSGL1 = (probabilidadeSobrevidaGlobal1Ano *100).toFixed(1);
	probFSGL3 = (probabilidadeSobrevidaGlobal3Anos *100).toFixed(1);
	probFSGL5 = (probabilidadeSobrevidaGlobal5Anos *100).toFixed(1);

	probLD1 = (probabilidadeSobrevidaLD1Ano *100).toFixed(1);
	probLD3 = (probabilidadeSobrevidaLD3Anos *100).toFixed(1);
	probLD5= (probabilidadeSobrevidaLD5Anos *100).toFixed(1);



	// Exibe o resultado na div resultado
	const resultadoContainer = document.getElementById('resultado-container');
	resultadoContainer.innerHTML = `<h2>AJCC Global: ${resultadoVariavel}<br>AJCC Livre Doença: ${resultadoVariavel2}
	<br>Score Global: ${scoreGlobal} <br>Score Livre Doença: ${scoreLD}
	<br>Pontuação Global: ${PontuacaoGL}
	<br>Pontuação Livre de Doença: ${PontuacaoLD}
	<br>Probabilidade de Sobrevida Global 1 Ano: ${probFSGL1}%
	<br>Probabilidade de Sobrevida Global 3 Anos: ${probFSGL3}%
	<br>Probabilidade de Sobrevida Global 5 Anos: ${probFSGL5}%
	<br>Probabilidade de Sobrevida Livre de Doença 1 Ano: ${probLD1}%
	<br>Probabilidade de Sobrevida Livre de Doença 3 Anos: ${probLD3}%
	<br>Probabilidade de Sobrevida Livre de Doença 5 Anos: ${probLD5}%</h2>`;

	

	atualizarSliderPontuacaoLD();
	atualizarSliderPontuacaoGL();
	atualizarValorScoreNumerico();

	
}


//js da barra colorida de Score 


document.addEventListener('DOMContentLoaded', function () {
    const circleBars = document.querySelectorAll('.circle-bar');


	let probFSGL1 = parseFloat(document.getElementById('scoreCircle').value+20);
    const probFSGL3 = 20;
    const probFSGL5 = 10;

    const values = [probFSGL1, probFSGL3, probFSGL5];

    function updateCircle(circleBar, value) {

		while (circleBar.firstChild) {
            circleBar.removeChild(circleBar.firstChild);
        }

        let canvas = document.createElement('canvas');
        let text = document.createElement('p');
        circleBar.style.position = 'relative';

        text.style.position = 'absolute';
        text.style.top = '50%';
        text.style.left = 0;
        text.style.width = '100%';
        text.style.textAlign = 'center';
        text.style.transform = 'translateY(-50%)';

        let ctx = canvas.getContext('2d');
        circleBar.appendChild(canvas);
        circleBar.appendChild(text);

        canvas.width = 200;
        canvas.height = 200;

        let originCircle = () => {
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.strokeStyle = 'rgba(188, 188, 188,1)';

            ctx.beginPath();
            ctx.arc(100, 100, 80, 0, 2 * Math.PI);
            ctx.lineWidth = 12;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(100, 100, 68, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        let stepCircle = (v) => {
            ctx.translate(100, 100);
            ctx.rotate(-Math.PI / 2);
            ctx.translate(-100, -100);

            ctx.beginPath();
            ctx.arc(100, 100, 80, 0, (v / 50) * Math.PI);
            ctx.lineWidth = 12;
            ctx.strokeStyle = 'rgba(255, 72, 71,1)';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(100, 100, 68, 0, (v / 50) * Math.PI);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255, 72, 71,1)';
            ctx.stroke();
        };
		
        originCircle();
        stepCircle(value);
        text.innerText = value + '%';
		

    }

    // Adicione os valores dinâmicos diretamente no primeiro loop forEach
    circleBars.forEach(function (circleBar, index) {
        let value;

        if (index === 0) {
            value = parseInt(circleBar.getAttribute('value')) || 0;
        } else {
             // Certifique-se de atualizar os valores a cada iteração
            value = values[index - 1] || 0;		
        }
		
		updateCircle(circleBar, value);
		
		
    });
	
});


//teste outra barra:

/*
Conic gradients are not supported in all browsers (https://caniuse.com/#feat=css-conic-gradients), so this pen includes the CSS conic-gradient() polyfill by Lea Verou (https://leaverou.github.io/conic-gradient/)
*/


document.addEventListener("DOMContentLoaded", function () {
	const scoreCircle2 = document.getElementById("scoreCircle");
	const scoreCircle3 = document.getElementById("scoreCircle3");
	const scoreCircle5 = document.getElementById("scoreCircle5");
  
	const rating = document.querySelector(".rating");
	const rating3 = document.querySelector(".rating-GL3");
	const rating5 = document.querySelector(".rating-GL5");
  
	function updateRating(scoreCircle, ratingElement) {
	  const ratingContent = scoreCircle.value;
  
	  const scoreClass =
		ratingContent < 40 ? "bad" : ratingContent < 60 ? "meh" : "good";
  
	  ratingElement.className = "rating " + scoreClass;
  
	  const ratingColor = window.getComputedStyle(ratingElement).backgroundColor;
  
	  const gradient = `conic-gradient(${ratingColor} ${ratingContent}%, transparent 0 100%)`;
  
	  ratingElement.style.backgroundImage = gradient;
  
	  document.getElementById("pontuacaoCircle").value = ratingContent;
	}
  
	updateRating(scoreCircle2, rating);
	updateRating(scoreCircle3, rating3);
	updateRating(scoreCircle5, rating5);
  
	scoreCircle2.addEventListener("input", function () {
	  updateRating(scoreCircle2, rating);
	});
  
	scoreCircle3.addEventListener("input", function () {
	  updateRating(scoreCircle3, rating3);
	});

	scoreCircle5.addEventListener("input", function () {
		updateRating(scoreCircle5, rating5);
	  });
  });
  