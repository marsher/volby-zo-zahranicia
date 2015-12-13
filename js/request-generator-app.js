var RequestGeneratorApp = function() {
    this.state = {
        tp: -1, // {'tp-na-slovensku', 'tp-odhlaseny'}
        volba: -1, // {volba-postou, volba-s-preukazom}
        preukaz: -1, // {preukaz-do-vlastnych-ruk, preukaz-preberie-splnomocnenec}
        pdf: '' // {pdf-preview, pdf-sign, pdf-finalize}
    };

    this.has_form_data = false;

    this.init();
};

RequestGeneratorApp.prototype = {
    init: function() {
        var that = this;

        $('.btn-submit-form').on('click', function(e){
            e.preventDefault();

            that.submitForm();
        });

        $('.btn-download-pdf').on('click', function(e){
            e.preventDefault();

            that.downloadPdf();
        });

        $('.btn-finalize-pdf').on('click', function(e){
            e.preventDefault();

            that.finalizePdf();
        });

        $('.btn-sign-pdf').on('click', function(e){
            e.preventDefault();

            that.signPdf();
        });
    },

    run: function() {
        var hash = location.hash.replace( /^#/, '');
        var section;

        switch (hash)
        {
            case 'start':
            case 'tp-na-slovensku':
                section = hash;
                break;
            case 'tp-na-slovensku&volba-s-preukazom':
                section = 'volba-s-preukazom';
                break;
            case 'tp-odhlaseny':
            case 'tp-na-slovensku&volba-postou':
            case 'tp-na-slovensku&volba-s-preukazom&preukaz-do-vlastnych-ruk':
            case 'tp-na-slovensku&volba-s-preukazom&preukaz-preberie-splnomocnenec':
                section = 'ziadost';
                break;
            default:
                section = 'intro';
        }

        this.stateFromHash(hash);

        if (this.state.pdf != '')
        {
            if (this.has_form_data)
            {
                switch (this.state.pdf)
                {
                    case 'pdf-preview':
                        section = 'pdf';
                        break;

                    case 'pdf-sign':
                        section = 'sign';
                        break;

                    case 'pdf-finalize':
                        section = 'pdf-final';
                        break;
                }
            }
            else
            {
                location.hash = '#intro';
            }

        }

        this.showSection(section);
    },

    submitForm: function()
    {
        createDocument(true);
        this.has_form_data = true;

        var hash = location.hash.replace( /^#/, '').replace(/&pdf-.*/, '');
        location.hash = hash + '&pdf-preview';
    },

    signPdf: function()
    {
        var hash = location.hash.replace( /^#/, '').replace(/&pdf-.*/, '');
        location.hash = hash + '&pdf-sign';
    },

    downloadPdf: function()
    {
        createDocument(false, 'TP');
    },

    finalizePdf: function()
    {
        $('.section').hide();

//		$('#signature').val(signaturePad.toDataURL());
//		createDocument(true);

        $('#pdf-final').show();

        //var hash = location.hash.replace( /^#/, '').replace(/&pdf-.*/, '');
        //location.hash = hash + '&pdf-finalize';
    },

    initForm: function() {
        if (this.state.tp == 'tp-odhlaseny')
        {
            nemamTP();
        }

        if (this.state.volba == 'volba-postou')
        {
            postaTP();
        }

        if (this.state.preukaz == 'preukaz-do-vlastnych-ruk')
        {
            preukazTP();
        }

        if (this.state.preukaz == 'preukaz-preberie-splnomocnenec')
        {
            preukazPS();
        }
    },

    stateFromHash: function(hash)
    {
        var that = this;

        this.state = {
            tp: -1,
            volba: -1,
            preukaz: -1,
            pdf: ''
        };

        var parts = hash.split('&');

        $.each(parts, function(i, part) {
            $.each(['tp', 'volba', 'preukaz', 'pdf'], function(i, prefix) {
                if (part.indexOf(prefix) == 0)
                {
                    that.state[prefix] = part;
                }
            })
        });
    },

    showSection: function(id)
    {
        var that = this;

        $('.section').hide();
        $.when($('#' + id).show()).done(function(){
            resizeCanvas();

            if (id == 'ziadost')
            {
                that.initForm();
            }
        });
    }
};