// P5.js Sketches

        // --- Animation 1: Pythagorean Theorem ---
        let sketchPythagoras = function(p) {
            let sliderA, sliderB, playButton;
            let a = 30, b = 40, c;
            let angle = 0;
            let playing = true;
            let valueASpan, valueBSpan;

            p.setup = function() {
                let canvas = p.createCanvas(p.min(p.select('#pythagorasAnimationContainer').width, 600), p.select('#pythagorasAnimationContainer').height);
                canvas.parent('pythagorasAnimationContainer');
                p.angleMode(p.DEGREES);
                
                sliderA = p.select('#pythagorasSliderA');
                sliderB = p.select('#pythagorasSliderB');
                playButton = p.select('#pythagorasPlayPause');
                valueASpan = p.select('#pythagorasValueA');
                valueBSpan = p.select('#pythagorasValueB');

                sliderA.input(() => { 
                    a = sliderA.value() * 10; 
                    valueASpan.html(sliderA.value()); 
                    sliderA.elt.setAttribute('aria-valuenow', sliderA.value());
                    sliderA.elt.setAttribute('aria-valuetext', sliderA.value());
                    p.redraw(); 
                });
                sliderB.input(() => { 
                    b = sliderB.value() * 10; 
                    valueBSpan.html(sliderB.value()); 
                    sliderB.elt.setAttribute('aria-valuenow', sliderB.value());
                    sliderB.elt.setAttribute('aria-valuetext', sliderB.value());
                    p.redraw(); 
                });
                playButton.mousePressed(() => { playing = !playing; if(playing) p.loop(); else p.noLoop(); });
                
                a = sliderA.value() * 10; // Internal logic uses scaled value
                b = sliderB.value() * 10; // Internal logic uses scaled value
                valueASpan.html(sliderA.value());
                valueBSpan.html(sliderB.value());
                sliderA.elt.setAttribute('aria-valuenow', sliderA.value());
                sliderA.elt.setAttribute('aria-valuetext', sliderA.value());
                sliderB.elt.setAttribute('aria-valuenow', sliderB.value());
                sliderB.elt.setAttribute('aria-valuetext', sliderB.value());

                if (playing) p.loop(); else p.noLoop();
            };

            p.draw = function() {
                p.background(240, 248, 255); // AliceBlue
                c = p.sqrt(a*a + b*b);

                let centerX = p.width / 2;
                let centerY = p.height * 0.6;
                let scaleFactor = p.min(p.width / (a + b + 20), p.height / (b + 20)) * 0.8; // Dynamic scaling
                
                let scaledA = a * scaleFactor;
                let scaledB = b * scaleFactor;
                let scaledC = c * scaleFactor;

                p.push();
                p.translate(centerX - scaledA / 2, centerY + scaledB / 2); // Center the figure

                // Draw squares
                p.fill(255, 100, 100, 150); // Red for a^2
                p.rect(0, -scaledA, scaledA, scaledA);
                p.fill(100, 100, 255, 150); // Blue for b^2
                p.rect(scaledA, 0, scaledB, scaledB);
                
                // Draw hypotenuse square
                p.push();
                p.translate(scaledA, -scaledA);
                p.rotate(p.atan2(scaledA, scaledB));
                p.fill(100, 255, 100, 150); // Green for c^2
                p.rect(0, -scaledC, scaledC, scaledC);
                p.pop();

                // Draw triangle
                p.fill(255, 200, 0, 200); // Orange triangle
                p.stroke(0);
                p.strokeWeight(2);
                p.beginShape();
                p.vertex(0, 0);
                p.vertex(scaledA, 0);
                p.vertex(scaledA, -scaledA);
                p.endShape(p.CLOSE);

                // Labels
                p.fill(0);
                p.noStroke();
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(14 * scaleFactor * 2);
                p.text("a", scaledA / 2, -scaledA - 10 * scaleFactor);
                p.text("b", scaledA + scaledB / 2, -scaledA + 10 * scaleFactor);
                p.push();
                p.translate(scaledA/2, -scaledA/2);
                p.rotate(p.atan2(scaledA, scaledB));
                p.text("c", scaledC/2, -scaledC - 10 * scaleFactor);
                p.pop();

                p.pop();

                // Formula display
                p.fill(0);
                p.textSize(16);
                p.textAlign(p.CENTER, p.TOP);
                p.text(`a=${(a/10).toFixed(1)}, b=${(b/10).toFixed(1)}, c=${(c/10).toFixed(1)}`, p.width/2, 10);
                p.text(`a² + b² = c²`, p.width/2, 30);
                p.text(`${(a/10).toFixed(1)}² + ${(b/10).toFixed(1)}² = ${(c/10).toFixed(1)}²`, p.width/2, 50);
                p.text(`${(a*a/100).toFixed(2)} + ${(b*b/100).toFixed(2)} = ${(c*c/100).toFixed(2)}`, p.width/2, 70);

                if (playing) {
                    angle += 0.5; // Slow rotation for visual effect if needed, but not central to Pythagoras
                }
            };
             // Ensure first frame is drawn
            setTimeout(() => { if (p.redraw) p.redraw(); }, 0);
        };
        new p5(sketchPythagoras);

        // --- Animation 2: Euler's Formula ---
        let sketchEuler = function(p) {
            let sliderX, playButton;
            let angle = 0;
            let playing = true;
            let radius;
            let valueXSpan;

            p.setup = function() {
                let canvas = p.createCanvas(p.min(p.select('#eulerAnimationContainer').width, 400), p.select('#eulerAnimationContainer').height);
                canvas.parent('eulerAnimationContainer');
                p.angleMode(p.DEGREES);
                radius = p.min(p.width, p.height) * 0.35;

                sliderX = p.select('#eulerSliderX');
                playButton = p.select('#eulerPlayPause');
                valueXSpan = p.select('#eulerValueX');

                sliderX.input(() => { 
                    angle = parseFloat(sliderX.value()); 
                    valueXSpan.html(angle.toFixed(0)); 
                    sliderX.elt.setAttribute('aria-valuenow', angle.toFixed(0));
                    sliderX.elt.setAttribute('aria-valuetext', angle.toFixed(0) + '度');
                    p.redraw(); 
                });
                playButton.mousePressed(() => { playing = !playing; if(playing) p.loop(); else p.noLoop(); });
                
                angle = parseFloat(sliderX.value());
                valueXSpan.html(angle.toFixed(0));
                sliderX.elt.setAttribute('aria-valuenow', angle.toFixed(0));
                sliderX.elt.setAttribute('aria-valuetext', angle.toFixed(0) + '度');
                if (playing) p.loop(); else p.noLoop();
            };

            p.draw = function() {
                p.background(240, 248, 255);
                p.translate(p.width / 2, p.height / 2);

                // Draw axes
                p.stroke(150);
                p.strokeWeight(1);
                p.line(-p.width / 2, 0, p.width / 2, 0); // Real axis
                p.line(0, -p.height / 2, 0, p.height / 2); // Imaginary axis
                p.fill(0);
                p.noStroke();
                p.text("Re", p.width/2 - 20, -5);
                p.text("Im", 5, -p.height/2 + 15);

                // Draw unit circle
                p.stroke(0, 0, 255, 100);
                p.noFill();
                p.ellipse(0, 0, radius * 2, radius * 2);

                // Calculate point on circle
                let x_coord = radius * p.cos(angle);
                let y_coord = -radius * p.sin(angle); // Negative because P5 y-axis is inverted

                // Draw radius vector
                p.stroke(255, 0, 0); // Red vector
                p.strokeWeight(3);
                p.line(0, 0, x_coord, y_coord);

                // Draw projections
                p.stroke(0, 150, 0, 150); // Green for cos
                p.strokeWeight(2);
                p.line(x_coord, y_coord, x_coord, 0); 
                p.stroke(200, 0, 200, 150); // Purple for sin
                p.line(x_coord, y_coord, 0, y_coord);

                // Draw point
                p.fill(255, 0, 0);
                p.noStroke();
                p.ellipse(x_coord, y_coord, 8, 8);

                // Text labels
                p.fill(0);
                p.textSize(14);
                p.textAlign(p.LEFT);
                p.text(`cos(${angle.toFixed(0)}°)`, x_coord / 2, -10);
                p.textAlign(p.RIGHT);
                p.text(`sin(${angle.toFixed(0)}°)`, -10, y_coord / 2);
                p.textAlign(p.CENTER);
                p.text(`e^(i*${angle.toFixed(0)}°) = cos(${angle.toFixed(0)}°) + i*sin(${angle.toFixed(0)}°)`, 0, p.height/2 - 20);


                if (playing) {
                    angle = (angle + 0.5) % 360;
                    sliderX.value(angle); // Update slider position
                    valueXSpan.html(angle.toFixed(0));
                    sliderX.elt.setAttribute('aria-valuenow', angle.toFixed(0));
                    sliderX.elt.setAttribute('aria-valuetext', angle.toFixed(0) + '度');
                }
            };
            setTimeout(() => { if (p.redraw) p.redraw(); }, 0);
        };
        new p5(sketchEuler);

        // --- Animation 3: Trig Identity (cos^2 + sin^2 = 1) ---
        let sketchTrigIdentity = function(p) {
            let angleSlider, playButton;
            let angle = 0;
            let playing = true;
            let radius;
            let valueAngleSpan;

            p.setup = function() {
                let canvas = p.createCanvas(p.min(p.select('#trigIdentityAnimationContainer').width, 400), p.select('#trigIdentityAnimationContainer').height);
                canvas.parent('trigIdentityAnimationContainer');
                p.angleMode(p.DEGREES);
                radius = p.min(p.width, p.height) * 0.3;

                angleSlider = p.select('#trigSliderAngle');
                playButton = p.select('#trigPlayPause');
                valueAngleSpan = p.select('#trigValueAngle');

                angleSlider.input(() => { 
                    angle = parseFloat(angleSlider.value()); 
                    valueAngleSpan.html(angle.toFixed(0)); 
                    angleSlider.elt.setAttribute('aria-valuenow', angle.toFixed(0));
                    angleSlider.elt.setAttribute('aria-valuetext', angle.toFixed(0) + '度');
                    p.redraw(); 
                });
                playButton.mousePressed(() => { playing = !playing; if(playing) p.loop(); else p.noLoop(); });
                
                angle = parseFloat(angleSlider.value());
                valueAngleSpan.html(angle.toFixed(0));
                angleSlider.elt.setAttribute('aria-valuenow', angle.toFixed(0));
                angleSlider.elt.setAttribute('aria-valuetext', angle.toFixed(0) + '度');
                if (playing) p.loop(); else p.noLoop();
            };

            p.draw = function() {
                p.background(240, 248, 255);
                p.translate(p.width / 2, p.height * 0.6); // Shift down for text on top

                // Unit circle
                p.stroke(150);
                p.noFill();
                p.ellipse(0, 0, radius * 2, radius * 2);

                let cos_val = p.cos(angle);
                let sin_val = p.sin(angle);
                let x = radius * cos_val;
                let y = -radius * sin_val; // P5 y-axis inverted

                // Triangle sides
                p.strokeWeight(2);
                p.stroke(0, 0, 255); // Blue for cos(angle)
                p.line(0, 0, x, 0);
                p.stroke(255, 0, 0); // Red for sin(angle)
                p.line(x, 0, x, y);
                p.stroke(0, 128, 0); // Green for hypotenuse (radius=1)
                p.line(0, 0, x, y);

                // Point on circle
                p.fill(0);
                p.noStroke();
                p.ellipse(x, y, 8, 8);

                // Labels
                p.fill(0,0,255);
                p.text(`cos(${angle.toFixed(0)}°)`, x / 2, 15);
                p.fill(255,0,0);
                p.text(`sin(${angle.toFixed(0)}°)`, x + 5, y / 2);
                p.fill(0,128,0);
                p.text("1", x/2 - 10, y/2 - 5);

                // Equation
                p.fill(0);
                p.textAlign(p.CENTER, p.TOP);
                p.textSize(16);
                let cosSq = p.pow(cos_val, 2);
                let sinSq = p.pow(sin_val, 2);
                p.text(`cos²(${angle.toFixed(0)}°) + sin²(${angle.toFixed(0)}°) = 1`, 0, -p.height * 0.6 + 20);
                p.text(`${cosSq.toFixed(2)} + ${sinSq.toFixed(2)} = ${(cosSq + sinSq).toFixed(2)}`, 0, -p.height * 0.6 + 45);
                
                if (playing) {
                    angle = (angle + 0.5) % 360;
                    angleSlider.value(angle); // Update slider position
                    valueAngleSpan.html(angle.toFixed(0));
                    angleSlider.elt.setAttribute('aria-valuenow', angle.toFixed(0));
                    angleSlider.elt.setAttribute('aria-valuetext', angle.toFixed(0) + '度');
                }
            };
            setTimeout(() => { if (p.redraw) p.redraw(); }, 0);
        };
        new p5(sketchTrigIdentity);

        // --- Animation 4: Spacetime Diagram (Conceptual Lorentz Transformation) ---
        let sketchSpacetime = function(p) {
            let vSlider, playButton;
            let beta = 0.5; // v/c
            let playing = true;
            let time = 0;
            let valueVSpan;

            p.setup = function() {
                let canvas = p.createCanvas(p.min(p.select('#spacetimeAnimationContainer').width, 400), p.select('#spacetimeAnimationContainer').height);
                canvas.parent('spacetimeAnimationContainer');
                
                vSlider = p.select('#spacetimeSliderV');
                playButton = p.select('#spacetimePlayPause');
                valueVSpan = p.select('#spacetimeValueV');

                vSlider.input(() => { 
                    beta = parseFloat(vSlider.value()); 
                    valueVSpan.html(beta.toFixed(2)); 
                    vSlider.elt.setAttribute('aria-valuenow', beta.toFixed(2));
                    vSlider.elt.setAttribute('aria-valuetext', beta.toFixed(2) + ' c');
                    p.redraw(); 
                });
                playButton.mousePressed(() => { playing = !playing; if(playing) p.loop(); else p.noLoop(); });
                
                beta = parseFloat(vSlider.value());
                valueVSpan.html(beta.toFixed(2));
                vSlider.elt.setAttribute('aria-valuenow', beta.toFixed(2));
                vSlider.elt.setAttribute('aria-valuetext', beta.toFixed(2) + ' c');
                if (playing) p.loop(); else p.noLoop();
            };

            p.draw = function() {
                p.background(240, 248, 255);
                p.translate(p.width / 2, p.height / 2);
                let scale = p.min(p.width, p.height) / 3;

                // Stationary frame (S) axes (x, ct)
                p.stroke(0);
                p.strokeWeight(1);
                p.line(-p.width/2, 0, p.width/2, 0); // x-axis
                p.line(0, -p.height/2, 0, p.height/2); // ct-axis
                p.fill(0);
                p.noStroke();
                p.text("x", p.width/2 - 15, -5);
                p.text("ct", 5, -p.height/2 + 15);

                // Moving frame (S') axes (x', ct')
                // gamma factor
                let gamma = 1 / p.sqrt(1 - beta*beta);
                
                // ct' axis: x = beta * ct  (slope = 1/beta for ct vs x, or beta for x vs ct)
                // x' axis: ct = beta * x   (slope = beta for ct vs x)
                p.stroke(255, 0, 0, 150); // Red for S'
                p.strokeWeight(2);
                
                // ct' axis (line where x' = 0)
                // In S frame: x = v*t => x = beta * (ct)
                p.line(0,0, beta * scale, scale);
                p.line(0,0, -beta * scale, -scale);
                
                // x' axis (line where t' = 0)
                // In S frame: t = (v/c^2)*x => ct = beta * x
                p.line(0,0, scale, beta*scale);
                p.line(0,0, -scale, -beta*scale);

                p.fill(255,0,0);
                p.noStroke();
                // Label for x' (along the x' axis)
                p.push();
                p.rotate(p.atan(beta));
                p.text("x'", scale * 0.8, -5);
                p.pop();
                // Label for ct' (along the ct' axis)
                p.push();
                p.rotate(p.atan(1/beta)); // Angle with y-axis (ct) is atan(beta)
                p.text("ct'", 5, -scale * 0.8 );
                p.pop();


                // An event
                let eventX = p.cos(time * 2) * scale * 0.3; // Some arbitrary event
                let eventCT = p.sin(time * 2) * scale * 0.3 + scale * 0.2;

                p.fill(0,0,255);
                p.ellipse(eventX, -eventCT, 10, 10); // Draw event (y is inverted)

                // Spacetime interval (conceptual)
                // s^2 = (ct)^2 - x^2
                // For light cone: (ct)^2 - x^2 = 0 => ct = +/- x
                p.stroke(200, 200, 0, 100); // Yellow for light cone
                p.line(0,0, p.width/2, -p.width/2);
                p.line(0,0, -p.width/2, p.width/2);
                p.line(0,0, p.width/2, p.width/2);
                p.line(0,0, -p.width/2, -p.width/2);


                p.fill(0);
                p.noStroke();
                p.textAlign(p.CENTER, p.BOTTOM);
                p.text(`Invariant interval: s² = (cΔt)² - (Δx)²`, 0, p.height/2 - 10);

                if (playing) {
                    time += 0.01;
                }
            };
            setTimeout(() => { if (p.redraw) p.redraw(); }, 0);
        };
        new p5(sketchSpacetime);

        // --- Animation 5: Wave Superposition (Conceptual for Quantum) ---
        let sketchWaveSuperposition = function(p) {
            let phaseSlider, playButton;
            let phaseOffset = 0; // degrees
            let playing = true;
            let t = 0;
            let valuePhaseSpan;

            p.setup = function() {
                let canvas = p.createCanvas(p.min(p.select('#waveSuperpositionAnimationContainer').width, 600), p.select('#waveSuperpositionAnimationContainer').height);
                canvas.parent('waveSuperpositionAnimationContainer');
                p.angleMode(p.DEGREES);

                phaseSlider = p.select('#waveSliderPhase');
                playButton = p.select('#wavePlayPause');
                valuePhaseSpan = p.select('#waveValuePhase');

                phaseSlider.input(() => { 
                    phaseOffset = parseFloat(phaseSlider.value()); 
                    valuePhaseSpan.html(phaseOffset.toFixed(0)); 
                    phaseSlider.elt.setAttribute('aria-valuenow', phaseOffset.toFixed(0));
                    phaseSlider.elt.setAttribute('aria-valuetext', phaseOffset.toFixed(0) + '度');
                    p.redraw(); 
                });
                playButton.mousePressed(() => { playing = !playing; if(playing) p.loop(); else p.noLoop(); });
                
                phaseOffset = parseFloat(phaseSlider.value());
                valuePhaseSpan.html(phaseOffset.toFixed(0));
                phaseSlider.elt.setAttribute('aria-valuenow', phaseOffset.toFixed(0));
                phaseSlider.elt.setAttribute('aria-valuetext', phaseOffset.toFixed(0) + '度');
                if (playing) p.loop(); else p.noLoop();
            };

            p.draw = function() {
                p.background(240, 248, 255);
                let amplitude = p.height / 6;
                let waveLength = 200;

                // Wave 1
                p.stroke(0, 0, 255, 150); // Blue
                p.noFill();
                p.strokeWeight(2);
                p.beginShape();
                for (let x = 0; x < p.width; x += 5) {
                    let y = p.height / 3 + amplitude * p.sin(360 * (x / waveLength) - t);
                    p.vertex(x, y);
                }
                p.endShape();

                // Wave 2
                p.stroke(255, 0, 0, 150); // Red
                p.beginShape();
                for (let x = 0; x < p.width; x += 5) {
                    let y = p.height / 3 + amplitude * p.sin(360 * (x / waveLength) - t + phaseOffset);
                    p.vertex(x, y);
                }
                p.endShape();

                // Superposition
                p.stroke(0, 128, 0); // Green
                p.strokeWeight(3);
                p.beginShape();
                for (let x = 0; x < p.width; x += 5) {
                    let y1 = amplitude * p.sin(360 * (x / waveLength) - t);
                    let y2 = amplitude * p.sin(360 * (x / waveLength) - t + phaseOffset);
                    p.vertex(x, p.height * (2/3) + y1 + y2); // Plot superposition lower
                }
                p.endShape();
                
                p.fill(0);
                p.noStroke();
                p.textSize(14);
                p.text("波 1 (蓝色)", 10, p.height/3 - amplitude - 5);
                p.text("波 2 (红色, 相位差: " + phaseOffset.toFixed(0) + "°)", 10, p.height/3 + amplitude + 15);
                p.text("叠加波 (绿色)", 10, p.height*(2/3) - amplitude*2 - 5);


                if (playing) {
                    t = (t + 2) % 360;
                }
            };
            setTimeout(() => { if (p.redraw) p.redraw(); }, 0);
        };
        new p5(sketchWaveSuperposition);
