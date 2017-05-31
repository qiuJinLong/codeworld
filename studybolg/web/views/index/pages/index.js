module.exports = function(templateParams) {
    var _cssList = ['common', 'index-index'];
    var webAssetsHelp = require('../../../webAssetsHelp.js')(templateParams, _cssList);
    var _html = "{% extends '../../common/pages/layout.html' %}\n" +
        "{% block title %}[[title]]{% endblock %}\n" +
        "{% block styles %}\n" +
        webAssetsHelp.styles + 
        "\n{% endblock %}\n" +
        '{% block content %}\n' +
        '{% include "../../../widget/course/course.html" %}\n' +
        '{% endblock %}\n' +
        '{% block script%}\n' +
        webAssetsHelp.scripts +
        '\n{% endblock%}\n';
    return _html;
};


// {	
// 	entry: {
//         'index-index': 'F:\\workspace\\studycopy\\web\\views\\index-index.entry.es'
//     },
//     output: {
//         path: 'F:\\workspace\\studycopy\\build\\',
//         publicPath: '/',
//         filename: 'assets/scripts/[name].bundle.js'
//     },
//     module: {
//         rules: [[Object], [Object], [Object], [Object]]
//     },
//     plugins: [
//     	CommonsChunkPlugin {
// 	        chunkNames: [Object],
// 	        filenameTemplate: 'assets/scripts/[name].bundle.js',
// 	        minChunks: undefined,
// 	        selectedChunks: undefined,
// 	        children: undefined,
// 	        async: undefined,
// 	        minSize: undefined,
// 	        ident: 'F:\\workspace\\studycopy\\node_modules\\webpack\\lib\\optimize\\CommonsChunkPlugin.js0'
// 	    },
// 	    HtmlWebpackPlugin {
// 	        options: [Object]
// 	    }
// 	],        
//     resolve: {
//         extensions: ['.vue', '.js', '.es', '.less'],
//         alias: {
//             vue: 'vue/dist/vue.js'
//         }
//     }
// }