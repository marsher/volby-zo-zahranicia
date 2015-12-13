election.Analytics = (function(undefined) {
    /**
     * Track user flow in application
     * @param {string} step
     * @param {int} stepNumber
     * @param {boolean} isStepBack
     */
    function trackStep(step, stepNumber, isStepBack) {
        var action = (isStepBack) ? 'step back' : 'next step';
        track('Application', action, step, stepNumber);
    }

    /**
     * Track event to analytics
     * @param {string} category
     * @param {string} action
     * @param {string} label
     * @param {int} value
     * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    function track(category, action, label, value) {
        if (!category || !action) {
            return false;
        }

        label = label || '';
        value = value || 0;

        if ('undefined' !== typeof (window.ga)) {
            window.ga('send', 'event', category, action, label, value);
        }

        return true;
    }

    return {
        track: track,
        trackStep: trackStep
    }
})();
