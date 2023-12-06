'use strict';

(function() {
    // Format image selector for compositional prompts.
    let captions = [
        "an astronaut riding a horse in a photorealistic style",
        "an astronaut riding a horse in the style of Pop Art",
        "an astronaut riding a horse as a charcoal sketch",
        "an astronaut riding a horse as a golden relief"
    ];

    let imagen_pieces = [
        ["an astronaut riding a horse"],
        ["in a photorealistic style", "in the style of Pop Art", "as a charcoal sketch", "as a golden relief"]
    ];

    const updateCompositionImage = () => {
        let phrase = "";
        for (let depth = 1; depth <= imagen_pieces.length; depth++) {
            let tagContainer = document.getElementById('compositional_tags_depth_left_' + depth);
            let selected = tagContainer.querySelectorAll('.selected');

            // Make sure at most one item is selected at this level.
            if (selected.length > 1) {
                // Too many tags selected at this level. Shouldn't have happened, but unselect them.
                selected.slice(1, selected.length).forEach((chunk) => {
                    chunk.classList.remove('selected'); // Remove the 'selected' class.
                });
            }

            // Make sure at least one item is selected at this level.
            if (selected.length === 0) {
                tagContainer.querySelector('span').classList.add('selected'); // Add the 'selected' class.
                updateCompositionImage();
                return;
            }

            let segment = selected[0].getAttribute("data-segment");
            phrase = phrase + segment;
        }

        if (captions.includes(phrase)) {
            let compositionalImage = document.getElementById('compositionalImageLeft');
            let imageName = phrase.replaceAll(' ', '_') + '.png';

            // Check if the current image source is the same as the new one.
            if (compositionalImage.alt !== phrase) {
                let imageURL = "assets/images/horse/" + imageName;
                console.log('phrase found: ', phrase, imageURL);

                compositionalImage.src = imageURL;
                compositionalImage.alt = phrase;

            }
        } else {
            console.log('phrase NOT found: ' + phrase);
        }
    };


    const deselect = (element) => {
        element.classList = ("" + element.classList).replace('selected', ' ');  // not clean, what about spaces?
    }

    const tagClicked = (event) => {
        event.target.parentNode.querySelectorAll('.selected').forEach(deselect);
        event.target.classList = "selected";
        updateCompositionImage();
    };

    let phraseContainer = document.querySelector('.compositional .text .left');
    imagen_pieces.forEach((phrases, depth) => {
        depth = depth + 1;
        let tagContainer = document.createElement("P");
        tagContainer.classList = "selectable left";
        tagContainer.id = "compositional_tags_depth_left_" + depth;

        phrases.forEach((segment, i) => {
            if (depth > 1) {
                segment = " " + segment;
            }

            let tag = document.createElement("SPAN");
            let text = segment.trim();
            if (!text)
                text = '[...]';

            tag.appendChild(document.createTextNode(text));
            tag.setAttribute("data-segment", segment);
            tag.onclick = tagClicked;
            if (i == 0)
                tag.classList = "selected";

            tagContainer.appendChild(tag);
        });

        phraseContainer.appendChild(tagContainer);
    });

})();


(function() {
    // Format image selector for compositional prompts.
    let captions = [
        "a sculpture of a duck made out of transparent glass",
        "a sculpture of a duck made of wool",
        "a sculpture of a duck made of wood",
        "a sculpture of a duck made of rock",
        "a sculpture of a duck made of paper"
    ];

    let imagen_pieces = [
        ["a sculpture of a duck"],
        ["made out of transparent glass", "made of wool", "made of wood", "made of rock", "made of paper"]
    ];

    const updateCompositionImage = () => {
        let phrase = "";
        for (let depth = 1; depth <= imagen_pieces.length; depth++) {
            let tagContainer = document.getElementById('compositional_tags_depth_right_' + depth);
            let selected = tagContainer.querySelectorAll('.selected');

            // Make sure at most one item is selected at this level.
            if (selected.length > 1) {
                // Too many tags selected at this level. Shouldn't have happened, but unselect them.
                selected.slice(1, selected.length).forEach((chunk) => {
                    chunk.classList.remove('selected'); // Remove the 'selected' class.
                });
            }

            // Make sure at least one item is selected at this level.
            if (selected.length === 0) {
                tagContainer.querySelector('span').classList.add('selected'); // Add the 'selected' class.
                updateCompositionImage();
                return;
            }

            let segment = selected[0].getAttribute("data-segment");
            phrase = phrase + segment;
        }

        if (captions.includes(phrase)) {
            let compositionalImage = document.getElementById('compositionalImageRight');
            let imageName = phrase.replaceAll(' ', '_') + '.png';

            // Check if the current image source is the same as the new one.
            if (compositionalImage.alt !== phrase) {
                let imageURL = "assets/images/duck/" + imageName;
                console.log('phrase found: ', phrase, imageURL);

                compositionalImage.src = imageURL;
                compositionalImage.alt = phrase;

            }
        } else {
            console.log('phrase NOT found: ' + phrase);
        }
    };


    const deselect = (element) => {
        element.classList = ("" + element.classList).replace('selected', ' ');  // not clean, what about spaces?
    }

    const tagClicked = (event) => {
        event.target.parentNode.querySelectorAll('.selected').forEach(deselect);
        event.target.classList = "selected";
        updateCompositionImage();
    };

    let phraseContainer = document.querySelector('.compositional .text .right');
    imagen_pieces.forEach((phrases, depth) => {
        depth = depth + 1;
        let tagContainer = document.createElement("P");
        tagContainer.classList = "selectable right";
        tagContainer.id = "compositional_tags_depth_right_" + depth;

        phrases.forEach((segment, i) => {
            if (depth > 1) {
                segment = " " + segment;
            }

            let tag = document.createElement("SPAN");
            let text = segment.trim();
            if (!text)
                text = '[...]';

            tag.appendChild(document.createTextNode(text));
            tag.setAttribute("data-segment", segment);
            tag.onclick = tagClicked;
            if (i == 0)
                tag.classList = "selected";

            tagContainer.appendChild(tag);
        });

        phraseContainer.appendChild(tagContainer);
    });

})();
