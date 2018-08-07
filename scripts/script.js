$(() => {
    const buildSetList = () => {
        $.get('https://api.magicthegathering.io/v1/sets', (data)=>{
            for(let i = 0; i < data.sets.length; i++) {
                if(data.sets[i].code.length <= 3) {
                    $('#sets').append(`<option value=${data.sets[i].code}>${data.sets[i].name}</option>`);
                }
            }
        });
    };

    buildSetList();

    $('body').on('click', 'button', ()=> {
        let numberOfParameters = 0;
        let baseUrl = `https://api.magicthegathering.io/v1/cards`;
        if($('#colorCheck').prop('checked')){
            if(numberOfParameters === 0) {
                baseUrl += '?';
            } else {
                baseUrl += '&';
            }
            let color = $('#color option:selected').text().toLowerCase();
            baseUrl += `colors=${color}`;
            numberOfParameters++;
        }
        if($('#setCheck').prop('checked')){
            if(numberOfParameters === 0) {
                baseUrl += '?';
            } else {
                baseUrl += '&';
            }
            let set = $('#sets option:selected').val().toLowerCase();
            baseUrl += `set=${set}`;
            numberOfParameters++;
        }
        $.get(baseUrl, (data)=> {
            $('#cardName').empty().text('Card Name');
            $('#cardColor').empty().text('Card Color');
            $('#manaCost').empty().text('Mana Cost');
            for(let i = 0; i < data.cards.length; i++) {
                console.log(data.cards[i]);


                $('#cardName').append(`<p><a href=${data.cards[i].imageUrl}>${data.cards[i].name}</a></p>`);
                if(data.cards[i].colors) {
                    $('#cardColor').append(`<p>${data.cards[i].colors[0]}</p>`);
                } else {
                    $('#cardColor').append(`<p>Colorless</p>`);
                }
                if(data.cards[i].manaCost){
                    $('#manaCost').append(`<p>${data.cards[i].manaCost}`);
                } else {
                    $('#manaCost').append(`<p>None</p>`);
                }
            }
        });
    });
});