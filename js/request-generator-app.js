var App = window.election;

var RequestGeneratorApp = function() {
    this.state = {
        tp: -1, // {'tp-na-slovensku', 'tp-odhlaseny'}
        volba: -1, // {volba-postou, volba-s-preukazom}
        preukaz: -1, // {preukaz-do-vlastnych-ruk, preukaz-preberie-splnomocnenec}
        action: '' // {action-preview, action-sign, action-finalize, action-send}
    };

    this.active_section = null;
    this.has_form_data = false;

    this.init();
};

RequestGeneratorApp.prototype = {
    init: function() {
        var that = this;

        $('.btn-submit-form').on('click', function(e){
            e.preventDefault();
			var submitform = true;
			if($(".has-error").length > 0){
				if(!confirm ("Ste si istý, že chcete vytvoriť žiadosť aj keď obsahuje chybu?")){
					submitform = false;
				}
			}
			if(submitform){
				that.submitForm();
			}
        });

        $('.btn-download-preview').on('click', function(e){
            e.preventDefault();
			createDocument(true,true);
            //that.downloadPdf();
        }); 
		$('.btn-download-pdf').on('click', function(e){
            e.preventDefault();
			createDocument(false,true);
            //that.downloadPdf();
        });

        $('.btn-finalize-pdf').on('click', function(e){
            e.preventDefault();

            that.finalizePdf();
        });

        $('.btn-sign-pdf').on('click', function(e){
            e.preventDefault();

            that.signPdf();
        });

        $('.btn-show-final-info').on('click', function(e){
            e.preventDefault();

            that.showFinalInfo();
        });

        $('.nav--progress a').on('click', function() {
            App.Analytics.trackStepBack(that.getStep(that.active_section), that.getPreviousStep());
        });
    },

    getStep: function(section)
    {
        var steps_map = {
            'intro': 0,
            'start': 1,// 'intro',
            'tp-na-slovensku': 2,// 'start',
            'preukaz': 3,// 'tp-na-slovensku',
            'ziadost': 4,
            'pdf': 5,
            'sign': 6,
            'pdf-final': 7,
            'sendsection': 8
        };

        return steps_map[section];
    },

    renderStep: function()
    {
        var step = this.getStep(this.active_section);

        if (step > 0)
        {
            var a = $('.nav-item a');

            $('.counter__step').text(step);
            var previous_step = this.getPreviousStep();
            a.attr('href', '#' + this.getBackUrl()).text(previous_step == 0 ? 'Späť na úvod' : 'Späť na krok ' + previous_step);

            $('.counter').show();
            $('.nav-item').show();
        }
        else
        {
            $('.nav-item').hide();
            $('.counter').hide();
        }
    },

    getBackUrl: function() {
        switch (this.getStep(this.active_section))
        {
            case 0: return null;
            case 1: return 'intro';
            case 2: return 'start';
            default: return this.getBasePreviousStateUrl();
        }
    },

    getPreviousStep: function()
    {
        var section_and_state = this.resolveSectionAndState(this.getBackUrl());
        return this.getStep(section_and_state[0]);
    },

    getBasePreviousStateUrl: function()
    {
        var hash = location.hash.replace( /^#/, '');

        if (this.state.action)
        {
            var previous_action = this.getPreviousAction();

            if (previous_action)
            {
                return hash.replace(/&action-.*/, '&' + previous_action);
            }
        }

        hash = hash.replace(/&{0,1}[^&]*$/, '');

        return hash ? hash : 'start';
    },

    getPreviousAction: function()
    {
        var actions = ['action-preview', 'action-sign', 'action-finalize', 'action-send'];

        var current_action_index = actions.indexOf(this.state.action);

        if (current_action_index > 0)
        {
            return actions[current_action_index - 1];
        }
        else
        {
            return null;
        }
    },

    run: function() {
        var section_and_state = this.resolveSectionAndState(location.hash);

        var section = section_and_state[0];

        if (section)
        {
            this.state = section_and_state[1];
            this.setActiveSection(section);

            this.renderStep();
        }
        else
        {
            location.hash = '#intro';
        }
    },

    resolveSectionAndState: function(hash)
    {
        hash = hash.replace( /^#/, '');

        var section;

        switch (hash)
        {
            case 'start':
            case 'tp-na-slovensku':
                section = hash;
                break;
            case 'tp-na-slovensku&volba-s-preukazom':
                section = 'preukaz';
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

        var state = this.stateFromHash(hash);

        if (state.action != '')
        {
            if (this.has_form_data)
            {
                switch (state.action)
                {
                    case 'action-preview':
                        section = 'pdf';
                        break;

                    case 'action-sign':
                        section = 'sign';
                        break;

                    case 'action-finalize':
                        section = 'pdf-final';
                        break;

                    case 'action-send':
                        section = 'sendsection';
                        break;
                }
            }
        }

        return [section, state];
    },

    submitForm: function()
    {
        createDocument(true);
        this.has_form_data = true;

        var hash = location.hash.replace( /^#/, '').replace(/&action-.*/, '');
        location.hash = hash + '&action-preview';
    },

    signPdf: function()
    {
        var hash = location.hash.replace( /^#/, '').replace(/&action-.*/, '');
        location.hash = hash + '&action-sign';
    },

    downloadPdf: function()
    {
        var src;

        if (this.active_section == 'pdf')
        {
            src = $('#preview').attr('src');
        }
        else
        {
            src = $('#final').attr('src');
        }

        window.open(src);
    },

    finalizePdf: function()
    {
        if(App.signaturePad.isEmpty() && !confirm ("Ste si istý, že chcete vytvoriť žiadosť aj bez podpisu?"))
        {

        }
        else
        {
            $('#signature').val(App.signaturePad.toDataURL());
            createDocument(false);

            $('#pdf-final').show();

            var hash = location.hash.replace( /^#/, '').replace(/&action-.*/, '');
            location.hash = hash + '&action-finalize';
        }
    },

    showFinalInfo: function()
    {
        var hash = location.hash.replace( /^#/, '').replace(/&action-.*/, '');
        location.hash = hash + '&action-send';
		fbq('track', 'CompleteRegistration');
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
        var state = {
            tp: -1,
            volba: -1,
            preukaz: -1,
            action: ''
        };

        var parts = hash.split('&');

        $.each(parts, function(i, part) {
            $.each(['tp', 'volba', 'preukaz', 'action'], function(i, prefix) {
                if (part.indexOf(prefix) == 0)
                {
                    state[prefix] = part;
                }
            })
        });

        return state;
    },

    setActiveSection: function(section)
    {
        this.active_section = section;

        var that = this;
		$('.help').hide();
        $('.section').hide();
        $.when($('#' + this.active_section).show()).done(function(){
            resizeCanvas();
            App.Analytics.trackStep(location.hash.replace( /^#/, ''), that.getStep(that.active_section));

            $('html, body').animate({ scrollTop: 0 }, 'slow');

            if (that.active_section == 'ziadost')
            {
                that.initForm();
            }
        });
    }
};