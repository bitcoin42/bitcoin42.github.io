
/*
* 
* ===================================================================
* CLOUD MAIN JS FILE
* ===================================================================
*
*/

'use strict';

(function ($) {
    let body;
    let box_account;
    let box_registration;
    let box_super;
    let box_loading;
    let lightbox_profile;
    let URL = document.location.href;
    let URL_NO_PARS = URL;
    let account;
    let pusher;
    let pusher_channel;
    let responsive = $(window).width() < 429;
    let messages = {
        password_length: sb_('The password must be at least 8 characters long.'),
        password_match: sb_('The passwords do not match.'),
        email: sb_('The email address is not valid.')
    };

    $(document).ready(function () {
        body = $('body');
        box_account = body.find('.sb-account-box');
        box_registration = box_account.length ? false : body.find('.sb-registration-box');
        box_super = body.find('.sb-super-box');
        lightbox_profile = body.find('.sb-profile-edit-box');
        box_loading = body.find('.sb-loading-global');
        body.removeClass('on-load');

        // Global
        body.on('click', '.sb-nav li', function () {
            $(this).siblings().sbActive(false);
            $(this).sbActive(true);
            $(this).closest('.sb-tab').find('> .sb-content > div').sbActive(false).eq($(this).index()).sbActive(true);
        });

        body.on('click', '.sb-lightbox .sb-close', function () {
            $(this).closest('.sb-lightbox').sbActive(false);
            body.find('.sb-lightbox-overlay').sbActive(false);
        });

        body.on('click', '.sb-lightbox .sb-info', function () {
            $(this).sbActive(false);
        });

        body.on('click', '.banner > i', function () {
            $(this).parent().remove();
        });

        if (URL.includes('?')) URL_NO_PARS = URL.substring(0, URL.indexOf('?'));

        // Responsive
        if (responsive) {
            body.on('click', '.sb-nav > div, .sb-nav.sb-active li', function () {
                let nav = $(this).closest('.sb-nav');
                if (nav.hasClass('sb-active')) nav.sbActive(false);
                else nav.addClass('sb-active');
            });
        }

        // Account
        if (box_account.length) {
            let chart;
            let chart_cnt = box_account.find('#chart-usage');
            let tabs = ['installation', 'membership', 'invoices', 'profile'];
            let encrypted_code;
            let profile_keys = box_account.find('#tab-profile .sb-input:not(#password)').map(function () { return $(this).attr('id') }).get();

            ajax('account', {}, (response) => {
                account = response;
                box_account.find('#embed-code').val(`<!--  Support Board -->\n<script id="chat-init" src="${CLOUD_URL}/account/js/init.js?id=${response.chat_id}"></script>`);
                box_account.stopLoading();
                for (var i = 0; i < profile_keys.length; i++) {
                    if (profile_keys[i] in response) box_account.find(`#${profile_keys[i]} input`).val(response[profile_keys[i]]);
                }
                for (var i = 0; i < 2; i++) {
                    let name = i ? 'email' : 'phone';
                    if (response[name + '_confirmed'] == 1) {
                        box_account.find('#' + name).removeClass('sb-type-input-button').find('.sb-btn').remove();
                    }
                }
                banners('verify');
            });

            box_account.on('click', ' > .sb-tab > .sb-nav li', function () {
                let tab_id = $(this).attr('id').replace('nav-', '');
                if (tab_id == 'membership') {
                    if (chart_cnt.hasClass('sb-loading')) {
                        $.getScript(CLOUD_URL + '/script/vendor/chart.min.js', () => {
                            chart_cnt.stopLoading();
                            chart = new Chart(chart_cnt, {
                                type: 'bar',
                                data: {
                                    labels: [sb_('January'), sb_('February'), sb_('March'), sb_('April'), sb_('May'), sb_('June'), sb_('July'), sb_('August'), sb_('September'), sb_('October'), sb_('November'), sb_('December')],
                                    datasets: [{
                                        data: messages_volume,
                                        backgroundColor: '#009BFC'
                                    }],
                                }, options: {
                                    legend: {
                                        display: false
                                    }
                                }
                            });
                        });
                        $.getScript('https://js.pusher.com/7.0/pusher.min.js', () => {
                            pusher = new Pusher(PUSHER_KEY, { cluster: 'eu' });
                            pusher_channel = pusher.subscribe('cloud-' + CLOUD_USER_ID);
                            pusher_channel.bind('gumroad', () => {
                                ajax('membership', {}, (response) => {
                                    box_account.find('.membership-quota').html(response.quota);
                                    box_account.find('.membership-name').html(sb_(response.name));
                                    box_account.find('.membership-price').html(response.price ? `${response.currency} ${response.price} ${sb_(response.period == 'monthly' ? 'a month' : 'a year')}` : sb_('Free'));
                                });
                            })
                        });
                    }
                    banners('suspended');
                }
                if (tab_id == 'profile') setTimeout(() => { banners('verify') }, 300);
                window.history.replaceState(null, null, '?tab=' + tab_id);
            });

            box_account.on('click', '.btn-verify-email,.btn-verify-phone', function () {
                let value = $(this).parent().find('input').val();
                if (!value || loading(this)) return;
                let data = {};
                let is_email = $(this).hasClass('btn-verify-email');
                data[is_email ? 'email' : 'phone'] = $(this).parent().find('input').val();
                ajax('verify', data, (response) => {
                    encrypted_code = response;
                    banner(`We sent you a secret code`, `We sent you a secret code, please enter it below to verify your ${is_email ? 'email address' : 'phone number'}.`, `<div data-type="text" class="sb-input sb-type-input-button"><input type="text"><a id="btn-verify-code" class="sb-btn">Complete verification</a></div>`);
                    $(this).stopLoading();
                });
            });

            box_account.on('click', '.banner #btn-verify-code', function () {
                let code = $(this).parent().find('input').val();
                if (!code || loading(this)) return;
                ajax('verify', { 'code_pairs': [encrypted_code, code] }, (response) => {
                    if (response) {
                        let email = response[0] == 'email';
                        setLogin(response[1][0], response[1][1]);
                        let setting = $(box_account).find(email ? '#email' : '#phone');
                        setting.removeClass('sb-type-input-button').find('.sb-btn').remove();
                        banner_success(`Thank you! Your ${email ? 'email address' : 'phone number'} has been verified.`);
                        $(this).stopLoading();
                    } else {
                        banner_error('Error. Something went wrong.');
                    }
                });
            });

            box_account.on('click', '#save-profile', function () {
                if (loading(this)) return;
                let details = {};
                let error = false;
                box_account.find('#tab-profile .sb-input input').each((e, element) => {
                    let id = $(element).parent().attr('id');
                    let value = $.trim($(element).val());
                    if (!value) {
                        banner_error('All fields are required.');
                        error = true;
                    }
                    if (id == 'password' && value.length < 8) {
                        banner_error(messages.password_length);
                        error = true;
                    }
                    if (id == 'email' && (!value.includes('@') || !value.includes('.'))) {
                        banner_error(messages.email);
                        error = true;
                    }
                    details[id] = value;
                });
                if (!error) {
                    ajax('account-save', { 'details': details }, (response) => {
                        if (Array.isArray(response)) {
                            setLogin(response[0], response[1]);
                            banner_success('Your profile information has been updated successfully.');
                        } else {
                            banner_error(response);
                        }
                        $(this).stopLoading();
                    });
                } else $(this).stopLoading();
            });

            box_account.on('click', '#nav-invoices', function () {
                let tab = box_account.find('#tab-invoices');
                if (tab.hasClass('sb-loading')) {
                    ajax('invoices', {}, (response) => {
                        let code = '';
                        for (var i = 0; i < response.length; i++) {
                            code += `<tr><td><a data-id="${response[0].id}" href="${response[0].invoice_pdf}" target="_blank"><i class="sb-icon-file"></i>${(new Date(response[0].created * 1000)).toISOString().slice(0, 10)} | ${response[i].currency.toUpperCase()} ${response[0].amount_paid} | ${response[0].number}</a></td></tr>`;
                        }
                        if (code) tab.find('tbody').html(code);
                        else tab.append(`<p>${sb_('There are no invoices yet.')}</p>`);
                        tab.stopLoading();
                    });
                }
            });

            box_account.on('click', '.tiers-box > div', function () {
                let btn = box_account.find('#purchase-membership');
                let scroll_area = $(this).closest('.sb-scroll-area');
                $(this).siblings().sbActive(false);
                $(this).sbActive(true);
                btn.sbActive(true)
                scroll_area.animate({ scrollTop: scroll_area.height() + box_account.find('.tiers-box').height() - 200 }, 300);
            });

            box_account.on('click', '#purchase-membership', function (e) {
                e.preventDefault();
                if (loading(this)) return;
                ajax('stripe-create-session', { price_id: box_account.find('.tiers-box > .sb-active').attr('data-id'), cloud_user_id: CLOUD_USER_ID }, (response) => {
                    document.location = response.url;
                });
            });

            box_account.on('click', '#cancel-subscription', function (e) {
                e.preventDefault();
                if (confirm(sb_('Are you sure? The subscription will be cancelled.'))) {
                    if (loading(this)) return;
                    ajax('stripe-cancel-subscription', {}, (response) => {
                        if (response == 'no-subscriptions') {
                            banner('Subscription already cancelled', 'You do not have any active subscription.', '', false, false, true);
                        } else if (response && 'status' in response && response.status == 'canceled') {
                            banner('Subscription cancelled', 'The subscription has ben cancelled sucessfully.', '', false, false, true);
                        } else {
                            banner('Error', JSON.stringify(response), '', false, true);
                        }
                        $(this).stopLoading();
                    });
                }
            });

            if (URL.includes('welcome')) {
                banner('text_welcome_title' in SETTINGS ? SETTINGS.text_welcome_title : 'Welcome to Support Board!', 'text_welcome' in SETTINGS ? SETTINGS.text_welcome : 'To complete the installation copy and paste the code below into your website, then click the dashboard button here on top right.', '', 'text_welcome_image' in SETTINGS ? SETTINGS.text_welcome_image : 'https://board.support/media/chat.png');
                window.history.replaceState({}, document.title, URL_NO_PARS);
                box_account.find('.sb-btn-dashboard').addClass('animation-button');
            }

            if (URL.includes('tab=')) {
                for (var i = 0; i < tabs.length; i++) {
                    if (URL.includes('tab=' + tabs[i])) {
                        box_account.find(' > .sb-tab > .sb-nav li').eq(i).click();
                        break;
                    }
                }
            }

            banners('suspended');
        }

        // Registration
        if (box_registration.length) {
            let box_login = body.find('.sb-login-box');
            let box_reset_password = body.find('.sb-reset-password-box');

            $(box_registration).on('click', '.btn-register', function (e) {
                if (loading(this)) return;
                let details_ids = ['first_name', 'last_name', 'email', 'password', 'password_2'];
                let details = {};
                let errors = false;
                let errors_area = box_registration.find('.sb-errors-area');
                errors_area.html('');
                for (var i = 0; i < details_ids.length; i++) {
                    let input = box_registration.find(`#${details_ids[i]} input`);
                    if ($.trim(input.val()) == '') {
                        input.addClass('sb-error');
                        errors = true;
                    } else input.removeClass('sb-error');
                    details[details_ids[i]] = $.trim(input.val());
                }
                if (errors) {
                    errors_area.html(sb_('All fields are required.'));
                } else if (details['password'].length < 8) {
                    errors_area.html(messages.password_length);
                    errors = true;
                } else if (details['password'] != details['password_2']) {
                    errors_area.html(messages.password_match);
                    errors = true;
                } else if (!details['email'].includes('@') || !details['email'].includes('.')) {
                    errors_area.html(messages.email);
                    errors = true;
                } else {
                    setLogin('', '');
                    ajax('registration', { 'details': details }, (response) => {
                        if (response == 'duplicate-email') {
                            errors_area.html(sb_('This email is already in use. Please use another email.'));
                        } else {
                            setLogin(response[0], response[1]);
                            ajax('account-welcome');
                            setTimeout(() => { document.location = CLOUD_URL + '/account?welcome' }, 300);
                        }
                        $(this).stopLoading();
                    });
                }
                if (errors) $(this).stopLoading();
                e.preventDefault();
                return false;
            });

            $(box_login).on('click', '.btn-login', function (e) {
                let email = box_login.find('#email input').val();
                let password = box_login.find('#password input').val();
                let errors_area = box_login.find('.sb-errors-area');
                if (email == '' || password == '' || loading(this)) return;
                ajax('login', { 'email': email, 'password': password }, (response) => {
                    if (response === false) {
                        errors_area.html(sb_('Invalid email or password.'));
                    } else {
                        setLogin(response[0], response[1]);
                        document.location = CLOUD_URL;
                    }
                    $(this).stopLoading();
                });
                e.preventDefault();
                return false;
            });

            $(box_login).on('click', '.btn-registration-box', function () {
                box_login.removeClass('active');
                box_registration.addClass('active');
            });

            $(box_registration).on('click', '.sb-btn-login-box', function () {
                box_registration.removeClass('active');
                box_login.addClass('active');
            });

            $(box_reset_password).on('click', '.btn-reset-password', function () {
                let email = $.trim(box_reset_password.find('#reset-password-email').val());
                if (email && email.includes('@') && email.includes('.')) {
                    ajax('account-reset-password', { 'email': email });
                    box_reset_password.html(`<div class="sb-top-bar"><div class="sb-title">${sb_('Check your email')}</div><div class="sb-text">${sb_('If an account linked to the email provided exists you will receive an email with a link to reset your password.')}</div></div>`);
                }
            });

            $(box_reset_password).on('click', '.btn-cancel-reset-password', function () {
                box_reset_password.removeClass('active');
                box_login.addClass('active');
            });

            $(box_login).on('click', '.btn-forgot-password', function () {
                box_registration.removeClass('active');
                box_login.removeClass('active');
                box_reset_password.addClass('active');
            });

            if (URL.includes('reset=')) {
                let token = URL.substr(URL.indexOf('reset=') + 6);
                let box_reset_password_2 = body.find('.sb-reset-password-box-2');
                let info = box_reset_password_2.find('.sb-info');
                $(box_reset_password_2).on('click', '.btn-reset-password-2', function () {
                    let password = box_reset_password_2.find('#reset-password-1').val();
                    info.html('').sbActive(false);
                    if (!password) return;
                    if (password != box_reset_password_2.find('#reset-password-2').val()) {
                        info.html(messages.password_match).sbActive(true);
                        return;
                    }
                    if (password.length < 8) {
                        info.html(messages.password_length).sbActive(true);
                        return;
                    }
                    if (loading(this)) return;
                    ajax('account-reset-password', { 'token': token, 'password': password }, (response) => {
                        box_login.addClass('active');
                        box_reset_password_2.removeClass('active');
                        $(this).stopLoading();
                    });
                });
            }

            $(window).keydown(function (e) {
                if (e.which == 13) {
                    $('.btn-login').click();
                }
            });
        }

        // Super admin
        if (box_super.length) {
            if (box_super.find('.table-customers').length) {
                ajax('super-get-customers', {}, (response) => {
                    let code = '';
                    for (var i = 0; i < response.length; i++) {
                        let user = response[i];
                        code += `<tr data-customer-id="${user.id}"><td data-id="id">${user.id}</td><td data-id="name">${user.first_name} ${user.last_name}</td><td data-id="email">${user.email}</td><td data-id="phone">${user.phone}</td><td data-id="membership">${get_membership(user.membership).name}</td><td data-id="token">${user.token}</td><td data-id="creation_time">${user.creation_time}</td></tr>`;
                    }
                    box_super.find('.table-customers tbody').html(code);
                    box_super.find('#tab-customers').stopLoading();
                });
            }

            $(box_super).on('click', '.btn-login', function (e) {
                let email = box_super.find('#email input').val();
                let password = box_super.find('#password input').val();
                let errors_area = box_super.find('.sb-errors-area');
                if (email == '' || password == '' || loading(this)) return;
                ajax('super-login', { 'email': email, 'password': password }, (response) => {
                    if (response === false) {
                        errors_area.html('Invalid email or password.');
                    } else {
                        cookie('sb-super', response, 3650);
                        document.location = URL_NO_PARS + '?login=success';
                    }
                    $(this).stopLoading();
                });
                e.preventDefault();
                return false;
            });

            $(box_super).on('click', '.table-customers td', function (e) {
                box_loading.sbActive(true);
                ajax('super-get-customer', { 'customer_id': $(this).parent().attr('data-customer-id') }, (response) => {
                    let fields_editable = ['first_name', 'last_name', 'email', 'phone', 'password'];
                    let fields_readonly = ['id', 'lifetime_value', 'token', 'creation_time', 'gumroad_id', 'membership_data'];
                    let code = '';
                    for (var i = 0; i < fields_editable.length; i++) {
                        code += `<div data-type="text" class="sb-input"><span>${slugToString(fields_editable[i])}</span><input id="${fields_editable[i]}" type="text" value="${response[fields_editable[i]]}" required /></div>`;
                    }
                    code += `<div data-type="text" class="sb-input"><span>Membership</span><select id="membership" required>`;
                    for (var i = 0; i < MEMBERSHIPS.length; i++) {
                        code += `<option value="${i}"${MEMBERSHIPS[i].id == response.membership ? ' selected' : ''}>${MEMBERSHIPS[i].name}</option>`;
                    }
                    code += '</select></div>';
                    lightbox_profile.find('.sb-edit-box').html(code);

                    code = '';
                    for (var i = 0; i < fields_readonly.length; i++) {
                        code += `<div data-type="readonly" class="sb-input"><span>${slugToString(fields_readonly[i])}</span><input id="${fields_readonly[i]}" type="text" value="${response[fields_readonly[i]]}" readonly /></div>`;
                    }
                    lightbox_profile.find('.sb-readonly-box').html(code);

                    code = '';
                    for (var i = 0; i < response.sales.length; i++) {
                        code += `<div>${response.sales[i].variants.Tier} | ${response.sales[i].daystamp} | ${response.sales[i].currency_symbol}${response.sales[i].price}</div>`;
                    }
                    lightbox_profile.find('.sb-sales-box').html(code ? code : '<div>No data available</div>');

                    code = '';
                    for (var i = 0; i < response.monthly_volume.length; i++) {
                        code += `<div>${response.monthly_volume[i].date} | ${response.monthly_volume[i].count} messages</div>`;
                    }
                    lightbox_profile.find('.sb-volume-box').html(code ? code : '<div>No data available</div>');
                    lightbox_profile.find('.sb-name').html(response.first_name + ' ' + response.last_name);
                    lightbox_profile.find('.sb-delete-box input').val('');
                    lightbox_profile.attr('data-customer-id', response.id);
                    lightbox_profile.lightbox();
                });
                e.preventDefault();
                return false;
            });

            $(box_super).on('click', '.repeater-item > i', function () {
                $(this).parent().remove();
            });

            $(box_super).on('click', '#gumroad .sb-repeater-add', function () {
                $(this).parent().find('.sb-repeater').append(gumroad_row());
            });

            $(box_super).on('click', '#save-tiers', function () {
                if (window.confirm('Are you sure to update the membership tiers? The changes will be live instantaneously.')) {
                    if (loading(this)) return;
                    let button = $(this);
                    let tiers = [];
                    box_super.find('#gumroad .repeater-item').each(function () {
                        let item = [$(this).find('[data-id="mc"]').val().trim(), $(this).find('[data-id="yc"]').val().trim(), $(this).find('[data-id="q"]').val().trim(), $(this).find('[data-id="name"]').val().trim()];
                        if ($.isNumeric(item[0]) && $.isNumeric(item[1]) && $.isNumeric(item[2]) && item[3]) {
                            tiers.push(item);
                        } else {
                            banner_error('All fields are required. Quota, monthly cost and yearly cost must be numbers.');
                            button.stopLoading();
                            return;
                        }
                    });
                    ajax('super-save-gumroad-tiers', { 'tiers': tiers }, (response) => {
                        button.stopLoading();
                        if (is_true(response)) banner_success('Gumroad tiers saved successfully.');
                        else banner_error('Error:' + response);
                    });
                }
            });

            $(lightbox_profile).on('click', '.sb-save', function (e) {
                if (loading(this)) return;
                let details = {};
                let error = false;
                lightbox_profile.find('input[required],select[required]').each((e, input) => {
                    let value = $.trim($(input).val());
                    if (value == '') {
                        $(this).stopLoading();
                        $(lightbox_profile).find('.sb-info').html('All fields are required.').sbActive(true);
                        error = true;
                        return;
                    }
                    details[$(input).attr('id')] = value;
                });
                if (error) return;
                let customer_id = $(this).closest('[data-customer-id]').attr('data-customer-id');
                ajax('super-save-customer', { 'customer_id': customer_id, 'details': details }, (response) => {
                    let row = box_super.find(`.table-customers [data-customer-id="${customer_id}"]`);
                    row.find('[data-id="name"]').html(details.first_name + ' ' + details.last_name);
                    row.find('[data-id="email"]').html(details.email);
                    row.find('[data-id="phone"]').html(details.phone);
                    alert('Settings saved. Reload the page to see the changes.');
                    $(this).stopLoading();
                });
                e.preventDefault();
                return false;
            });

            $(lightbox_profile).on('click', '.sb-delete-box .sb-btn-text', function () {
                if ($(this).parent().find('input').val().toUpperCase() == 'DELETE') {
                    let customer_id = $(this).closest('[data-customer-id]').attr('data-customer-id');
                    ajax('super-delete-customer', { 'customer_id': customer_id });
                    box_super.find(`.table-customers [data-customer-id="${customer_id}"]`).remove();
                    body.find('.sb-lightbox,.sb-lightbox-overlay').sbActive(false);
                }
            });

            $(box_super).on('click', '#save-emails, #save-settings', function (e) {
                if (loading(this)) return;
                let settings = {};
                let email = $(this).attr('id') == 'save-emails';
                box_super.find(email ? '#tab-emails' : '#tab-settings').find(' .sb-setting textarea,.sb-setting input,.sb-setting select').each((e, input) => {
                    settings[$(input).attr('id')] = $.trim($(input).val());
                });
                ajax(email ? 'super-save-emails' : 'super-save-user-settings', { 'settings': settings }, (response) => {
                    if (is_true(response)) banner_success('Settings saved successfully.');
                    else banner_error('Error:' + response);
                    $(this).stopLoading();
                });
                e.preventDefault();
                return false;
            });

            $(body).on('click', '#nav-emails, #nav-settings', function () {
                let email = $(this).attr('id') == 'nav-emails';
                let area = $(body).find(email ? '#tab-emails' : '#tab-settings');
                if (area.hasClass('sb-loading')) {
                    ajax(email ? 'super-get-emails' : 'super-get-user-settings', {}, (response) => {
                        for (var key in response) {
                            area.find('#' + key).val(response[key]);
                        }
                        area.stopLoading();
                    });
                }
            });

            $(box_super).on('click', '#logout', function () {
                cookie('sb-super', '', 0);
                document.location = URL_NO_PARS + '?logout=true';
            });
        }
    });

    function ajax(function_name, data = {}, onSuccess = false) {
        $.extend(data, { function: function_name });
        $.ajax({
            method: 'POST',
            url: 'ajax.php',
            data: data
        }).done((response) => {
            if (onSuccess) onSuccess(response === false ? false : JSON.parse(response));
        });
    }

    function cookie(name, value, expiration_days) {
        let date = new Date();
        date.setTime(date.getTime() + expiration_days * 5040000);
        document.cookie = name + "=" + value + ";expires=" + (expiration_days == 0 ? 'Thu, 01 Jan 1970 00:00:01 GMT' : date.toUTCString()) + ";path=/;SameSite=None;Secure;";
    }

    function setLogin(cloud, sb) {
        cookie('sb-cloud', cloud, 3650);
        cookie('sb-login', sb, 3650);
    }

    function loading(element) {
        if ($(element).hasClass('sb-loading')) return true;
        else $(element).addClass('sb-loading');
        return false;
    }

    function banner(title, message, code = '', image = false, error = false, success = false) {
        body.find('.banner').remove();
        body.find('.sb-tab > .sb-content > .sb-active').prepend(`<div class="banner${image ? ' banner-img' : ''}${error ? ' banner-error' : ''}${success ? ' banner-success' : ''}">${image ? `<img src="${image}" />` : ''}<h2>${sb_(title)}</h2><p>${sb_(message)}</p><div>${code}</div><i class="sb-btn-icon sb-icon sb-icon-close"></i></div>`);
        if (responsive) body.scrollTop(0); else body.find('.sb-scroll-area').scrollTop(0);
    }

    function banner_success(message) {
        banner('', message, '', false, false, true);
    }

    function banner_error(message) {
        banner('', message, '', false, true);
    }

    function banners(type) {
        switch (type) {
            case 'suspended':
                if (membership.count >= membership.quota) banner('text_suspended_title' in SETTINGS ? SETTINGS.text_suspended_title : 'Your account is suspended', 'text_suspended' in SETTINGS ? SETTINGS.text_suspended : 'Your website visitors can still use the chat but you are not able to view the messages and reply to your visitors because you can not enter the administration area. Please upgrade to a higher plan to activate your account again.', '', false, true);
                break;
            case 'verify':
                let verify_email = box_account.find('.btn-verify-email').length;
                let verify_phone = box_account.find('.btn-verify-phone').length;
                let text = verify_email && verify_phone ? 'email and phone number' : (verify_email ? 'email' : 'phone number');
                if ((verify_email || verify_phone) && !URL.includes('welcome')) banner(`Verify your ${text}`, `Please verify your ${text} from the profile area.`, '', false, true);
                break;
        }
    }

    function slugToString(string) {
        string = string.replace(/_/g, ' ').replace(/-/g, ' ');
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function is_true(value) {
        return value === true || value == 1 || value === 'true';
    }

    function sb_(text) {
        return SB_TRANSLATIONS && text in SB_TRANSLATIONS ? SB_TRANSLATIONS[text] : text;
    }

    function gumroad_row(name = '', monthly_cost = '', yearly_cost = '', quota = '') {
        let inputs = [['Name', 'name'], ['Monthly cost', 'mc'], ['Yearly cost', 'yc'], ['Quota', 'q']];
        let code = '<div class="repeater-item">';
        for (var i = 0; i < inputs.length; i++) {
            let value;
            switch (i) {
                case 0:
                    value = name;
                    break;
                case 1:
                    value = monthly_cost;
                    break;
                case 2:
                    value = yearly_cost;
                    break;
                case 3:
                    value = quota;
                    break;
            }
            code += `<div><label>${inputs[i][0]}</label><input data-id="${inputs[i][1]}" type="text" value="${value}" /></div>`;
        }
        return code + '<i class="sb-icon-close"></i></div>';
    }

    function gumroad_populate() {
        let code = '';
        for (var i = 0; i < TIERS.length; i++) {
            code += gumroad_row(TIERS[i][3], TIERS[i][0], TIERS[i][1], TIERS[i][2]);
        }
        box_super.find('#gumroad .sb-repeater').html(code);
    }

    function get_membership(id) {
        for (var i = 0; i < MEMBERSHIPS.length; i++) {
            if (MEMBERSHIPS[i].id == id) return MEMBERSHIPS[i];
        }
        return MEMBERSHIPS[0];
    }

    $.fn.stopLoading = function () {
        $(this).removeClass('sb-loading');
        return this;
    }

    $.fn.startLoading = function () {
        $(this).addClass('sb-loading');
        return this;
    }

    $.fn.lightbox = function () {
        $(this).css({ 'margin-top': ($(this).outerHeight() / -2) + 'px', 'margin-left': ($(this).outerWidth() / -2) + 'px' });
        box_loading.sbActive(false);
        $(this).sbActive(true);
        body.find('.sb-lightbox-overlay').sbActive(true);
    }

    $.fn.setClass = function (class_name, add = true) {
        if (add) {
            $(this).addClass(class_name);
        } else {
            $(this).removeClass(class_name);
        }
        return this;
    }
    $.fn.sbActive = function (show = -1) {
        if (show === -1) return $(this).hasClass('sb-active');
        $(this).setClass('sb-active', show);
        return this;
    };

}(jQuery)); 
