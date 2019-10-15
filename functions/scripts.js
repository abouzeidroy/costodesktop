/**
 * handles the ajax response
 * @param  {object} data
 * @param  {object} status
 * @param  {object} headers
 * @param  {object} config
 * @return {bool}
 */
function handle_ajax_response(data, status, headers, config) {
	if (typeof data != "undefined" && data !== null) {
		if (typeof data.status != "undefined") {
			if (data.status == "failure") {
				handle_failure(data, status, headers, config);
				return false;
			}
		} else {
			handle_error(data, status, headers, config);
			return false;
		}
	} else {
		return false;
	}
	return true;
}
/**
 *  handles failures responses from the server
 * @param  {object} data
 * @param  {object} status
 * @param  {object} headers
 * @param  {object} config
 * @return {bool}
 */
function handle_failure(data, status, headers, config) {
	//single_button_popup_box("Failure", data.user_message, "Close");
	return true;
}
/**
 * handles error by display an error popup
 * @param  {object} data
 * @param  {object} status
 * @param  {object} headers
 * @param  {object} config
 * @return {bool}
 */
function handle_error(data, status, headers, config) {
	//single_button_popup_box("Error", "An error occured", "Close");
	return true;
}


function is_in_array(value, array) {
    return array.indexOf(value) > -1;
}