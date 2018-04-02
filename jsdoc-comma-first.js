var commentsBuffer = [];

exports.handlers = {
    beforeParse: function(e) {
        var source = e.source
          , lines = source.split('\n')
          , newSource = ''
          ;
        lines.forEach(function(line) {
            var linecopy = line.trim()
              , bufferLength = commentsBuffer.length
              ;
            if(linecopy.indexOf('/**') === 0 || bufferLength) {
                var prev = commentsBuffer[bufferLength-1];
                if(prev && prev.indexOf('*/') > -1) {
                    if(linecopy.indexOf(',') === 0) {
                        commentsBuffer.splice(0,0,',');
                        line = line.replace(',',' ');
                    }
                    commentsBuffer.push(line);
                    newSource += commentsBuffer.join('\n') + '\n';
                    commentsBuffer = [];
                    
                }
                else {
                    commentsBuffer.push(line);
                }
            }
            else {
                newSource += line+'\n';
            }
        });
        newSource = newSource.replace(/\n,/g,',');
        e.source = newSource;
    }
};
