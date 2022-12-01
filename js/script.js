var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

function operation(){
    const section_container = $(".section-container");
    const appHeaderContainer =  $(".app__header-container");
    const appHeaderLogo = $('.app__header-logo-container');
    const appHeaderInfo = $(".app__header-info");
    const appCategories = $$(".app__header-category");
    const GarellyBar = $('.app__header-category__bar--pc');
    const GarellySelection = $('.app__header-selection__link');
    const MobileBar = $('.app__header-category__bar--mobile');
    const introSliderItems = $$('.introSlider__item');
    const introSliderContainer = $('.introSlider__container');
    const indicatorBtns = $$('.carousel-indicators [data-bs-slide-to]');
    const imgBtns = $$('.introSlider__slideBtn-block');
    const previewImgs = $$('.introSlider__slideBtn-img');
    const menuDishBlocks = $$('[menu-item-index]');
    const dashService = $('.serviceSlide__container-textBlock__founder .dash');
    const serviceSlideTextHeading = $('.serviceSlide__container-textBlock__heading');
    const dashOnSale = $('.app__saleProducts .dash');
    const feedBackIndicatorBtns = $$('.user__FeedbackContainer__Indicators-Item');
    const feedBackBlockContainer = $('.user__FeedbackContainer__blockContainer');
    const customerFeedbackBlocks = $$('.user__FeedbackContainer__block');
    const resAdvantageBlocks = $$('.productAdvantages__container-itemBlock');
    const resAdvantageItems = $$('.productAdvantages__container-item');
    const resAdvantageImgs = $$('.productAdvantages__container-itemImg');
    var serivceSelectorItem = $(".userBooking__blockItem--selector");
    var serivceSelectorLabel = serivceSelectorItem.querySelector(".input__label");
    var serivceSelectorInput = serivceSelectorItem.querySelector(".input__tag");
    var serviceList = $(".userBooking__block__optionList");
    var strengthItemContainer = $(".app__resStrength__container");
    var strengthItems = $$(".resStrength__Item");
    var strengthItemNextBtns = $$(".app__resStrength__controller-icon");

    function openGarelly(e){
        const garellyBlock = $('.app__garelly');
        const xIcon = garellyBlock.querySelector('.app__garelly-heading__X-icon');
        const xIconElements = garellyBlock.querySelectorAll('.app__garelly-heading__X-icon-element');
        const headerCategoryWrapper = $('.app__header-categories__wrapper');
        const garellyImages = $$('.app__garelly-img__container');
        const modalGarelly = $('.index__modal');
        const carouselInner = $('.index__modal__slider');
        const carouselItems = $$('.index__modal__SliderItem');
        const carouselItemsImage = $$('.carousel-item img');
        const subImgContainer = $('.index__modal__sub-img-container');
        const subImages = $$('.index__modal__sub-img-block');
        const prevBtn = $('.carousel-control-prev');
        const nextBtn = $('.carousel-control-next');
        const modalOptionBar = $('.index__modal__options');
        const modalOptionPlayBar = $('.index__modal__options-playBar');
        const modalOptionPlayBarBuff = $('.index__modal__options-playBar-buffer');
        const originalSize = $('.index__modalOptions__iconContainer--originalSize');
        const zoomOut = $('.index__modalOptions__iconContainer--zoomOut');
        const zoomIn = $('.index__modalOptions__iconContainer--zoomIn')
        const autoNext = $('.index__modalOptions__iconContainer--play')
        const closeModal = $('.index__modalOptions__iconContainer--close')
        const modalOption = $('.index__modalOptions__container');
        modalOption.querySelector('.index__modalOptions__totalPic').innerHTML = garellyImages.length;
        const modalControllerSubItem = $('.index__modal__controller');
        const subItemControl = $('.index__modal__controller-grid22');

        e.preventDefault(); //prevent the click from jumping esp on hashes
        e.stopPropagation(); //prevent from any parent click handlers that didn't prevent the jump
        
        //when click on mobile bar.
        function displayX(){
            for (var element of xIconElements){
                element.classList.toggle('openGarelly');
            }
        }

        //to open garelly
        garellyBlock.classList.add('appeared');
        setTimeout(function(){
            displayX();
        }, 350)

        //close garelly
        xIcon.onclick = function(){
            displayX();
            garellyBlock.classList.remove('appeared');
            headerCategoryWrapper.style.transform = 'translateX(0)';
        }
        
        //to slide new main img by arrow 
        function toSlideMainImg(currentActiveIndex, ChosenItemIndex, position, nextType, slideDelayed = 0){
            //position: start || end
            //nextType: prev || next
            carouselItems[currentActiveIndex].removeAttribute('style');
            carouselItems[currentActiveIndex].classList.add('carousel-item' + position);
            carouselItems[ChosenItemIndex].classList.add('carousel-item' + nextType);
            setTimeout(function(){
                carouselItems[ChosenItemIndex].classList.add('carousel-item' + position);
            }, slideDelayed);
            setTimeout(function(){
                carouselItems[currentActiveIndex].classList.remove('carousel-item' + position, 'active');
                carouselItems[ChosenItemIndex].classList.remove('carousel-item' + position, 'carousel-item' + nextType);
                carouselItems[ChosenItemIndex].classList.add('active');
            }, 600);
        }

        //check which one will be displayed
        garellyImages.forEach(function(garellyImage){
            garellyImage.onclick = function(){
                carouselItems.forEach(function(carouselItem){
                    if(carouselItem.classList.contains('active')){
                        carouselItem.classList.remove('active');
                    }
                })
                var activedItem = carouselItems[Number(garellyImage.getAttribute('item-index'))];
                var subActivedItem = subImages[Number(garellyImage.getAttribute('item-index'))];
                activedItem.classList.add('active');
                subActivedItem.classList.add('displayed');
                modalGarelly.classList.add('displayed')
                setNewSelectedSubItem(Number(garellyImage.getAttribute('item-index')));
            }
        })

        //to choose main picture by selecting sub-image
        function getCurrentImage(){
            for(var i = 0; i < carouselItems.length; i++){
                if(carouselItems[i].classList.contains("active")){
                    return Number(carouselItems[i].getAttribute('item-index'));
                }
            }
        }

        //select new sub image
        function setNewSelectedSubItem(gotIndex){
            var currentIndexTag = modalOption.querySelector('.index__modalOptions__currentIndex');
            var oldSelected = subImgContainer.querySelector('.index__modal__sub-img-block.displayed');
            currentIndexTag.innerHTML = Number(gotIndex) + 1;
            oldSelected.classList.remove('displayed');
            subImages[gotIndex].classList.add('displayed');
        }

        //to refresh main img
        function refreshMainImg(index){
            carouselItems[index].removeAttribute('style');
        }
        
        //prev image
        prevBtn.onclick = function(){
            clearInterval(intervalMoving);
            var gotIndex = Number(carouselInner.querySelector('.active').getAttribute('item-index'));
            console.log(carouselInner.querySelector('.active'));
            refreshMainImg(gotIndex);
            if(gotIndex === 0){
                gotIndex = subImages.length - 1;
            }
            else{
                gotIndex = gotIndex - 1;
            }
            setNewSelectedSubItem(gotIndex);
        }

        //next image
        nextBtn.onclick = function(){
            clearInterval(intervalMoving);
            var gotIndex = Number(carouselInner.querySelector('.active').getAttribute('item-index'));
            console.log(carouselInner.querySelector('.active'));
            refreshMainImg(gotIndex);
            if(gotIndex === subImages.length - 1){
                gotIndex = 0;
            }
            else{
                gotIndex = gotIndex + 1;
            }
            setNewSelectedSubItem(gotIndex);
        }

        //close modal & gallery
        function toCloseModalGallery(){
            //close modal garelly
            modalGarelly.classList.remove('displayed');
            //close garelly
            garellyBlock.classList.remove('appeared');
            //removed displayed sub-item
            subImgContainer.querySelector('.displayed').classList.remove('displayed');
        }

        //when clicking on the space around big img
        modalGarelly.onclick = function(e){
            if(e.target.classList.contains('index__modal') || 
            e.target.classList.contains('index__modal__dish') ||
            e.target.classList.contains('index__modal-imgBlock')){
                //close modal, gallery, sub-img
                toCloseModalGallery();
                //remove current X
                displayX();
                //stop playing
                stopPlayingImmidiately();
                //refresh 
                refreshMainImg(getCurrentImage());
            }
        }

        //show new img by its sub image
        subImages.forEach(function(subImage){
            subImage.onclick = function(){
                var ClickedItemIndex = Number(subImage.getAttribute('item-index'));
                var currentActiveIndex = getCurrentImage();
                if(Number(this.getAttribute('item-index')) > currentActiveIndex){
                    toSlideMainImg(currentActiveIndex, ClickedItemIndex, '-start', '-next');
                }
                if(Number(this.getAttribute('item-index')) < currentActiveIndex){
                    toSlideMainImg(currentActiveIndex, ClickedItemIndex, '-end', '-prev');
                }
                setNewSelectedSubItem(ClickedItemIndex);
            }
        })
        
        //drag to change new main image
        carouselItemsImage.forEach(function(carouselItemImg){
            var prevItem = null;
            var currentItem = null;
            var nextItem = null;
            var firstXpos = 0;
            var movingPos = 0;
            var currentScreenSize = window.innerWidth;
            var threadDrag;
            if(currentScreenSize > 992){
                threadDrag = 100;
            }
            else if(currentScreenSize < 992 && currentScreenSize > 576){
                threadDrag = 70;
            }
            else{
                threadDrag = 50;
            }
            carouselItemImg.onmousedown = function(e){
                
                firstXpos = e.clientX;
                movingPos = 0;
                e.stopPropagation();
                e.preventDefault();
                firstXpos = e.clientX;

                //chose 3 elements: middle, prev, next
                currentItem = e.target.closest('.index__modal__SliderItem');
                prevItem = currentItem.previousElementSibling || carouselInner.lastElementChild;
                nextItem = currentItem.nextElementSibling || carouselInner.firstElementChild;
                
                e.target.style.cursor = 'grabbing';

                //to ensure when user drag, it doesn't have any delay time from transition
                //+ make chosen element appear properly
                currentItem.classList.add('non_transition');
                prevItem.classList.add('non_transition', 'carousel-item-prev');
                nextItem.classList.add('non_transition', 'carousel-item-next');
                this.onmousemove = function(e){
                    if(e.clientX <= firstXpos){
                        movingPos -= 5;
                    }
                    if(e.clientX > firstXpos){
                        movingPos += 5;
                    }
                    firstXpos = e.clientX;
                    currentItem.style.transform = `translate3d(${movingPos}px, 0, 0)`;
                    nextItem.style.transform = `translate3d(calc(100% + ${movingPos}px), 0, 0)`;
                    prevItem.style.transform = `translate3d(calc(-100% + ${movingPos}px), 0, 0)`;
                }
            }

            carouselItemImg.onmouseup = function(e){
                var currentActiveIndex = currentItem.getAttribute('item-index');
                var chosenIndex = null;
                e.target.style.cursor = 'grab';
                carouselItemImg.onmousemove = function(){};
                currentItem.classList.remove('non_transition');
                currentItem.removeAttribute('style');
                nextItem.removeAttribute('style');
                prevItem.removeAttribute('style');
                prevItem.classList.remove('non_transition', 'carousel-item-prev');
                nextItem.classList.remove('non_transition', 'carousel-item-next');
                if(movingPos >= threadDrag){
                    chosenIndex = prevItem.getAttribute('item-index');
                    prevItem.removeAttribute('style');
                    toSlideMainImg(currentActiveIndex, chosenIndex, '-end', '-prev');
                }
                else if(movingPos <= -threadDrag){
                    chosenIndex = nextItem.getAttribute('item-index');
                    nextItem.removeAttribute('style');
                    toSlideMainImg(currentActiveIndex, chosenIndex, '-start', '-next');
                }
                else{
                    prevItem.removeAttribute('style');
                    nextItem.removeAttribute('style');
                }
                if(chosenIndex){
                    setNewSelectedSubItem(chosenIndex);
                }
            }
        })

        //when you open gallery, if you don't move your mouse, 
        //barModalOption + prev&nextBtn will disappear after 5 sec
        var intervalMoving = true;
        function handleMovingMouseInGallery(){
            prevBtn.classList.remove('disappeared');
            nextBtn.classList.remove('disappeared');
            modalOptionBar.style.transform = 'translateY(0)';
            clearInterval(intervalMoving);
            intervalMoving = setInterval(function(){
                if(!autoNext.classList.contains('played')){
                    prevBtn.classList.add('disappeared');
                    nextBtn.classList.add('disappeared');
                    modalOptionBar.style.transform = 'translateY(-100%)';
                }
            }, 5000);
        }
        modalGarelly.addEventListener('mousemove', handleMovingMouseInGallery);

        modalOptionBar.onclick = function(){
            clearInterval(intervalMoving);
        }

        function getActivedItem(){
            return carouselInner.querySelector('.active');
        }

        var zoomVal = 1;
        originalSize.onclick = function(){
            var activedItem = getActivedItem();
            activedItem.removeAttribute('style');
            zoomVal = 0;
        }
        
        zoomOut.onclick = function(){
            var activedItem = getActivedItem();
            if(zoomVal === 1){
                zoomOut.classList.add('pure');
            }
            if(zoomVal > 1){
                zoomVal -= 1;
                activedItem.style.transform = `scale(${zoomVal})`;
            }
        }

        zoomIn.onclick = function(){
            var activedItem = getActivedItem();
            zoomVal += 1;
            activedItem.style.transform = `scale(${zoomVal})`;
            if(zoomVal > 1){
                zoomOut.classList.remove('pure');
            }
        }

        var inPlaying;
        //to handle the case u close modal suprisingly.
        function stopPlayingImmidiately(){
            modalOptionPlayBar.classList.remove('displayed');
            modalOptionPlayBarBuff.classList.remove('displayed');
            autoNext.classList.remove('played');
            clearInterval(inPlaying);
            autoNext.removeEventListener('click', handleAutoNext);
        }

        //auto play
        function autoSliding(){
            inPlaying = setInterval(function(){
                var currentActiveIndex =  getCurrentImage();
                var ChosenItemIndex = currentActiveIndex + 1;
                if(ChosenItemIndex === carouselItems.length){
                    ChosenItemIndex = 0;
                }
                setTimeout(function(){
                    toSlideMainImg(currentActiveIndex, ChosenItemIndex, '-start', '-next', 50);
                    setNewSelectedSubItem(ChosenItemIndex);
                    modalOptionPlayBar.classList.remove('displayed');
                }, 50);
                setTimeout(function(){
                    modalOptionPlayBar.classList.add('displayed');
                }, 100);
            }, 5000);
        }
        
        function handleAutoNext(e){
            modalOptionPlayBar.classList.toggle('displayed');
            modalOptionPlayBarBuff.classList.toggle('displayed');
            autoNext.classList.toggle('played');
            clearInterval(intervalMoving);
            modalGarelly.removeEventListener('mousemove', handleMovingMouseInGallery);
            if(!e.currentTarget.classList.contains('played')){
                clearInterval(inPlaying);
                modalGarelly.addEventListener('mousemove', handleMovingMouseInGallery);
            }
            else{
                autoSliding();
            }
        }
        autoNext.addEventListener('click', handleAutoNext);

        //cliking on X
        closeModal.onclick = function(){
            displayX();
            toCloseModalGallery();
            stopPlayingImmidiately();
        }

        subItemControl.onclick = function(){
            modalControllerSubItem.classList.toggle('hide');
        }
    }
    //End of gallery

    function openCategoryMobile(e){
        e.preventDefault();
        e.stopPropagation();
        var categoryBlock = $('.app__header__inforCat');
        var barBlock = e.currentTarget;
        categoryBlock.classList.toggle('showCategory');
        barBlock.classList.toggle('gather');
    }

    //MAIN SLIDER
    function changeSlide(oldElement, newElement, slidePos, nextType){
        oldElement.classList.add('carousel-item-' + slidePos);
        newElement.classList.add('carousel-item-' + nextType);
        setTimeout(function(){
            newElement.classList.add('carousel-item-'+slidePos);
        }, 100);
        setTimeout(function(){
            oldElement.classList.remove('active', 'carousel-item-' + slidePos);
            newElement.classList.remove('carousel-item-' + slidePos, 'carousel-item-' + nextType);
            newElement.classList.add('active');
            setUpPreviewImg();
            
        }, 600);
    }

    var index = 0;
    var nextIndex;
    var autoChangeSlider = true;
    function toChangeSliderAutomatically(){
        autoChangeSlider = setInterval(function(){
            if(index <= introSliderItems.length - 1) {
                nextIndex = index < introSliderItems.length - 1 ? index + 1 : 0;
                changeSlide(introSliderItems[index], introSliderItems[nextIndex], 'start', 'next');
                refreshCurrentSliderBtn(indicatorBtns[nextIndex]);
                index += 1;
            }
            else{
                index = 0;
            }
        }, 3000);
    }

    function refreshCurrentSliderBtn(handledELement){
        var oldParent;
        var currentParent = handledELement.closest('.introSlider__indicators-block');
        indicatorBtns.forEach(function(indicatorBtn){
            if(indicatorBtn.classList.contains('active')){
                oldParent = indicatorBtn.closest('.introSlider__indicators-block');
                indicatorBtn.classList.remove('active');
                oldParent.classList.remove('active');
            }
        })
        handledELement.classList.add('active');
        currentParent.classList.add('active');
    }

    function nextSliderByBtn(e){
        var handledELement = e.target;
        var eBlock = handledELement.closest('.introSlider__indicators-block');
        refreshCurrentSliderBtn(handledELement, eBlock);
    }

    function getCurrentSliderIndex(){
        var chosenIndex;
        var previewLeftIndex;
        var previewRightIndex;
        chosenIndex = Number(introSliderContainer.querySelector('.active.introSlider__item').getAttribute("item-index"));
        previewLeftIndex = chosenIndex > 0 ? chosenIndex - 1 : introSliderItems.length - 1;
        previewRightIndex = chosenIndex < introSliderItems.length - 1 ? chosenIndex + 1 : 0;
        //return 3 key indices need to handle
        return [chosenIndex, previewLeftIndex, previewRightIndex];
    }

    function setUpPreviewImg(){
        //0 - chosenIndex
        //1 - leftPreview
        //2 - rightPreview
        var indexArray = getCurrentSliderIndex();
        var previewLeftIndex = indexArray[1];
        var previewRightIndex = indexArray[2];
        previewImgs[0].style.backgroundImage = `url(./resource/img/index-slider/index-pz-${previewLeftIndex + 1}.jpg)`
        previewImgs[1].style.backgroundImage = `url(./resource/img/index-slider/index-pz-${previewRightIndex + 1}.jpg)`
    }

    //preview and next by pre-btn and next-btn
    function nextSliderByImgBtn(e){
        clearInterval(autoChangeSlider);
        var indexArray = getCurrentSliderIndex();
        var oldIndex = indexArray[0];
        var chosenIndex = indexArray[0];
        var previewLeftIndex = indexArray[1];
        var previewRightIndex = indexArray[2];
        var clickedBtn = e.currentTarget;

        if(clickedBtn.classList.contains('introSlider__slideBtn-block--left')){
            chosenIndex = previewLeftIndex;
            changeSlide(introSliderItems[oldIndex], introSliderItems[chosenIndex], 'end', 'prev');
        }
        else{
            chosenIndex = previewRightIndex;
            changeSlide(introSliderItems[oldIndex], introSliderItems[chosenIndex], 'start', 'next');
        }
        refreshCurrentSliderBtn(indicatorBtns[chosenIndex]);
        setTimeout(function(){
            toChangeSliderAutomatically();
        }, 600);
    }

    GarellyBar.onclick = openGarelly;
    GarellySelection.onclick = openGarelly;
    MobileBar.onclick = openCategoryMobile;

    indicatorBtns.forEach(function(indicatorBtn){
        indicatorBtn.onclick = nextSliderByBtn;
    })

    //toChangeSliderAutomatically();
    imgBtns.forEach(function(imgBtn){
        imgBtn.onclick = nextSliderByImgBtn;
        imgBtn.onmousemove = setUpPreviewImg;
    })

    //handle menu-item
    // let firstMenuRowTop = menuDishBlocks[1].getBoundingClientRect().top + window.scrollY;
    // let firstMenuRowBottom = menuDishBlocks[2].getBoundingClientRect().bottom + window.scrollY;
    let currentScreenPos = window.scrollY + window.innerHeight;

    function toMakeMenuItemAppear(currentScreenPos){
        menuDishBlocks.forEach(function(menuDishBlock){
            var tempTop = menuDishBlock.getBoundingClientRect().top + window.scrollY;
            if(currentScreenPos >= tempTop){
                menuDishBlock.classList.remove("preLoaded");
            }
        })
    }

    toMakeMenuItemAppear(currentScreenPos);
    
    //handle when scrolling
    window.addEventListener("scroll", (event) => {
        let scrollY = this.scrollY;

        let serviceSlideTop = 0;
        let onSaleSlideTop = 0;
        //get distance between element and top of site
        serviceSlideTop =  serviceSlideTop === 0 ? dashService.getBoundingClientRect().bottom + scrollY : undefined;
        onSaleSlideTop = onSaleSlideTop === 0 ? dashOnSale.getBoundingClientRect().bottom + scrollY : undefined;

        // dashOnSale.getBoundingClientRect().bottom + scrollY;
        currentScreenPos = scrollY + window.innerHeight;
        // console.log(currentScreenPos, firstMenuRowTop);
        
        //change header
        if(scrollY === 0){
            appCategories.forEach(function(appHeaderCategory){
                appHeaderCategory.classList.remove("change");
            });
            appHeaderLogo.classList.remove("change");
            appHeaderInfo.classList.remove("disappeared");
        }

        if(scrollY > 20){
            if(window.innerWidth >= 992){
                appCategories.forEach(function(appHeaderCategory){
                    appHeaderCategory.classList.add("change");
                })
                appHeaderLogo.classList.add("change");
                appHeaderInfo.classList.add("disappeared");
            }
        }
        //end of change header

        //appear menu items
        toMakeMenuItemAppear(currentScreenPos);

        //change service dash
        if(currentScreenPos >= serviceSlideTop){
            dashService.classList.remove("preLoaded");
            serviceSlideTextHeading.classList.remove("preLoaded");
        }
        else{
            dashService.classList.add("preLoaded");
        }
        //end of change service dash

        //change sale products dash
        if(currentScreenPos >= onSaleSlideTop){
            dashOnSale.classList.remove("preLoaded");
        }
        else{
            dashOnSale.classList.add("preLoaded");
        }
        //end of change sale products dash

    })
    
    // Handle user feedback
    // Customer feedbacks
    {var numberOfFeedbacks;
    var customerBlockWidth;
    var customerBlockMargin;
    var initX = 0;
    var customerBlockStep;
    var centerIndex = null;
    var updateScreenSize;
    var balancePart;}

    function initCustomerFeedback(){
        numberOfFeedbacks = 4;
        centerIndex = centerIndex === null ? numberOfFeedbacks - 1 : centerIndex;
        customerBlockMargin = getComputedStyle(customerFeedbackBlocks[0])["margin-right"];
        customerBlockMargin = Number(customerBlockMargin.replace("px", ""));
        
        if(window.innerWidth > 991){
            feedBackBlockContainer.removeAttribute("style");
            customerFeedbackBlocks.forEach(function(customerFeedbackBlock){
                customerFeedbackBlock.removeAttribute("style");
            })
            customerBlockWidth = customerFeedbackBlocks[0].offsetWidth;
            customerBlockStep = customerBlockWidth + customerBlockMargin;
            initX = initX === 0 ? -customerBlockStep * 2 : (centerIndex - 1) * -customerBlockStep;
            
            feedBackBlockContainer.style.cssText = `
                transform: translate3d(${initX}px, 0, 0);
            `
        }
        else if(window.innerWidth > 576 && window.innerWidth < 992){
            updateScreenSize = 4024 - ((992 - window.innerWidth) * 4);
            
            customerBlockWidth = updateScreenSize / customerFeedbackBlocks.length - 30;
            customerFeedbackBlocks.forEach(function(customerFeedbackBlock){
                customerFeedbackBlock.style.width = `${customerBlockWidth}px`;
            });

            customerBlockStep = customerBlockWidth + customerBlockMargin;
            balancePart = (customerBlockWidth - (window.innerWidth - (customerBlockStep * 2))) / 2 - 15;
            initX = initX === 0 ? (customerBlockStep * 2 * -1) - balancePart : (centerIndex - 1) * -customerBlockStep - balancePart;
            
            feedBackBlockContainer.style.cssText = `
                width: ${updateScreenSize}px;
                transform: translate3d(${initX}px, 0, 0);
            `
        }
        else{
            updateScreenSize = window.innerWidth * customerFeedbackBlocks.length;

            customerBlockWidth = updateScreenSize / customerFeedbackBlocks.length - 30;
            customerFeedbackBlocks.forEach(function(customerFeedbackBlock){
                customerFeedbackBlock.style.width = `${customerBlockWidth}px`;
            });
            
            customerBlockStep = customerBlockWidth + customerBlockMargin;
            balancePart = customerBlockMargin / 4;
            
            initX = initX === 0 ? -customerBlockStep * centerIndex + balancePart : (centerIndex) * -customerBlockStep + balancePart;
            feedBackBlockContainer.style.cssText = `
                width: ${updateScreenSize}px;
                transform: translate3d(${initX}px, 0, 0);
            `
        }
        customerFeedbackBlocks[centerIndex].classList.add("center");
    }

    function autoSlideCustomerFeedbacks(){
        setInterval(function(){
            toSlideFeedback("right");
        }, 4000)
    }

    function toSetContainerAfterChanged(delay=0.4){
        feedBackBlockContainer.style.cssText = `
            width: ${updateScreenSize}px;
            transform: translate3d(${initX}px, 0, 0);
            transition: all ${delay}s ease 0s;
        `;
    }

    //a little bug about async prob :D
    function toSlideFeedback(direction){
        if(direction === "right"){
            customerFeedbackBlocks[centerIndex].classList.remove("center");
            centerIndex += 1;
            if(centerIndex === (numberOfFeedbacks * 2) - 1){
                centerIndex = 3;
                setTimeout(function(){
                    initX = window.innerWidth > 575 ? -customerBlockStep : -customerBlockStep * (centerIndex - 1);
                    if(window.innerWidth < 992){
                        if(window.innerWidth > 575){
                            initX -= balancePart;
                        }
                        else{
                            initX += balancePart;
                        }
                        toSetContainerAfterChanged(0);
                    }
                    else{
                        feedBackBlockContainer.style.cssText = `
                            transform: translate3d(${initX}px, 0, 0);
                            transition: all .0s ease 0s;
                        `;
                    }
                }, 0)
                setTimeout(function(){
                    initX -= customerBlockStep;
                    if(window.innerWidth < 992){
                        toSetContainerAfterChanged();
                    }
                    else{
                        feedBackBlockContainer.style.cssText = `
                            transform: translate3d(${initX}px, 0, 0);
                            transition: all .4s ease 0s;
                        `;
                    }
                }, 50)
            }
            else{
                initX -= customerBlockStep;
                toSetContainerAfterChanged();
            }
            customerFeedbackBlocks[centerIndex].classList.add("center");
        }
        else{
            customerFeedbackBlocks[centerIndex].classList.remove("center");
            centerIndex -= 1;
            if(centerIndex === 0){
                centerIndex = 4;
                setTimeout(function(){
                    initX = window.innerWidth > 575 ? -customerBlockStep * centerIndex : -customerBlockStep * (centerIndex + 1);
                    if(window.innerWidth < 992){
                        if(window.innerWidth > 575){
                            initX -= balancePart;
                        }
                        else{
                            initX += balancePart;
                        }
                    }
                    toSetContainerAfterChanged(0);
                }, 0)
                setTimeout(function(){
                    initX += customerBlockStep;
                    if(window.innerWidth < 992){
                        toSetContainerAfterChanged();
                    }
                    else{
                        feedBackBlockContainer.style.cssText = `
                            transform: translate3d(${initX}px, 0, 0);
                            transition: all .4s ease;
                        `;
                    }
                }, 50)
            }
            else{
                initX += customerBlockStep;
                toSetContainerAfterChanged();
            }
            customerFeedbackBlocks[centerIndex].classList.add("center");
        }
        if(window.innerWidth > 991){
            feedBackBlockContainer.style.removeProperty('width');
        }
    }

    initCustomerFeedback();
    autoSlideCustomerFeedbacks();
    feedBackIndicatorBtns.forEach(function(feedBackIndicatorBtn){
        feedBackIndicatorBtn.onclick = function(){
            if(feedBackIndicatorBtn.classList.contains("user__FeedbackContainer__Indicators-Item--right")){
                toSlideFeedback("right");
            }
            else{
                toSlideFeedback("left");
            }
        }
    })

    //RESTAURANT ADVANTAGES
    var temp = document.querySelector(".app__productAdvantages__container");
    function updateAdvantageImgSize(){
        if(window.innerWidth > 1200){
            console.log(window.innerWidth);
            //drinks pic
            let containerHeight = 0;
            let smallImgHeight = resAdvantageImgs[2].offsetHeight;
            resAdvantageImgs[3].style.height = smallImgHeight + 'px';
            //pic 1 and pic 2
            
            // console.log(containerHeight);
            setTimeout(function(){
                containerHeight = resAdvantageBlocks[2].offsetHeight;
                resAdvantageImgs[0].style.height = containerHeight + 'px';
                resAdvantageImgs[1].style.height = containerHeight + 'px';
            }, 100);
        }
        else{
            if(window.innerWidth > 575){
                resAdvantageImgs[0].style.height = resAdvantageImgs[1].offsetHeight + 'px';
            }
            else{
                resAdvantageImgs[0].style.removeProperty("height"); 
            }
            resAdvantageImgs[1].style.removeProperty("height"); 
            resAdvantageImgs[3].style.removeProperty("height"); 
        } 
        
    }
    updateAdvantageImgSize();
    // resAdvantageItemsText.forEach(function(resAdvantageItemText){
    //     resAdvantageItemText.onmousemove = function(e){
    //         console.log(e.target);
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }
    // })
    resAdvantageItems.forEach(function(resAdvantageItem){
        resAdvantageItem.onmousemove = function(e){
            if(window.innerWidth >= 1200){
                let imgInside = resAdvantageItem.querySelector('.productAdvantages__container-itemImg');
                let textInside = resAdvantageItem.querySelector('.productAdvantages__container-itemText');
                let heightTextInside = textInside.offsetHeight;
                imgInside.style.transform = `translateY(${-heightTextInside}px)`;
                textInside.classList.add("displayed");
            }
        }
        resAdvantageItem.onmouseleave = function(e){
            let imgInside = resAdvantageItem.querySelector('.productAdvantages__container-itemImg');
            let textInside = resAdvantageItem.querySelector('.productAdvantages__container-itemText');
            imgInside.style.removeProperty("transform");
            textInside.classList.remove("displayed");
        }
    })

    serviceList.onclick = function(e){
        serivceSelectorLabel.innerText = "";
        serivceSelectorInput.value = e.target.innerText;
    }

    //RESTAURANT STRENGTH
    var totalItems = 4;
    var displayedItemsNum = 0;
    var strengthItemWidth = 0;
    var movingStep = 0;
    var timeSteps = 2;
    var initStage = 2;
    var currentStage = null;
    var itemMargin = 30;
    var curBtnPos = 1;
    var chosenBtnPos = null;
    var displayedBtnNum = 0;
    var delay = 50;

    //pitched idea, but need to make it definitive
    function toUpdateCarouselBtn(){
        document.querySelector(".app__resStrength__controller-icon.chosen").classList.remove("chosen");
        var newBtn = window.innerWidth > 991 ? parseInt(currentStage / timeSteps) - 1 : parseInt(currentStage / timeSteps) - 2;
        strengthItemNextBtns[newBtn].classList.add("chosen");
        curBtnPos = newBtn + 1;
    }

    function carouselBtnUpdateWhenResizing(){
        toUpdateCarouselBtn();
    }

    function carouselItemUpdate(container_width = 1200, displayedNum=4){
        strengthItemWidth = container_width / displayedNum - itemMargin;
        movingStep = strengthItemWidth + itemMargin;
        strengthItems.forEach(function(strengthItem){
            strengthItem.style.cssText = `
                width: ${strengthItemWidth}px;
                margin-right: ${itemMargin}px;
            `;
        });
    }

    function carouselUpdate(){
        if(window.innerWidth > 1200){
            displayedItemsNum = 4;
        }

        if(window.innerWidth <= 1200 && window.innerWidth > 991){
            displayedItemsNum = 2;
            displayedBtnNum = 2;
        }
        
        if(window.innerWidth < 992){
            timeSteps = 1;
            displayedItemsNum = 1;
            displayedBtnNum = 4;
        }
        else{
            timeSteps = 2;
        }        

        currentStage = currentStage === null ? 2 : currentStage;

        carouselItemUpdate(section_container.offsetWidth, displayedItemsNum);
        strengthItemContainer.style.width = `${movingStep * strengthItems.length}px`;
        strengthItemContainer.style.transform = `translateX(${-movingStep * currentStage}px)`;
        if(displayedBtnNum !== 0){
            carouselBtnUpdateWhenResizing();
        }
    }

    carouselItemUpdate();
    carouselUpdate();

    function toSlideCarouselItemHorizontally(delay){
        setTimeout(function(){
            strengthItemContainer.style.transform = `translateX(${-movingStep * currentStage}px)`;
            strengthItemContainer.style.removeProperty("transition");
            delay = 0;
        }, delay);
    }

    function toResetCarouselContainer(movingStep, currentStage){
        strengthItemContainer.style.transform = `translateX(${-movingStep * currentStage}px)`;
        strengthItemContainer.style.transition = `transform 0s ease 0s`;
        delay = 10;
    }

    function toResetCarouselRightLim(){
        currentStage = totalItems;
        toResetCarouselContainer(movingStep, currentStage);
        currentStage = totalItems + 1;     
    }

    function toResetCarouselLeftLim(){
        currentStage = initStage + 1;
        toResetCarouselContainer(movingStep, currentStage);
        currentStage = initStage;     
    }
    
    function toMoveCarouselItemByController(e){
        
        chosenBtnPos = Number(e.target.getAttribute("btn-pos"));
        document.querySelector(".app__resStrength__controller-icon.chosen").classList.remove("chosen");
        e.target.classList.add("chosen");

        if(chosenBtnPos !== curBtnPos){
            if(chosenBtnPos === totalItems){
                toResetCarouselRightLim();
            }
            else if(chosenBtnPos === initStage - 1){
                toResetCarouselLeftLim();
            }
            else{
                if(curBtnPos < chosenBtnPos){
                    currentStage += (timeSteps * (chosenBtnPos - curBtnPos));
                    
                }
                else{
                    currentStage -= (timeSteps * (curBtnPos - chosenBtnPos));
                }
                if(currentStage % timeSteps !== 0){
                    currentStage = timeSteps * chosenBtnPos;
                }
            }
            curBtnPos = chosenBtnPos;
        }
        toSlideCarouselItemHorizontally(delay);
    }

    var oldXPos = 0;
    var isDragLeft = null;

    function whileDragging(e){
        e.currentTarget.style["transition"] = `all 0s ease 0s`;
        
        if(e.clientX < oldXPos){
            isDragLeft = true;
            e.currentTarget.style["transform"] = `translateX(${(-currentStage * movingStep) - (oldXPos - e.clientX)}px)`;
        }

        if(e.clientX > oldXPos){
            isDragLeft = false;
            e.currentTarget.style["transform"] = `translateX(${(-currentStage * movingStep) + (e.clientX - oldXPos)}px)`;
        }
    }

    function toMoveCarouselByDragging(e){
        oldXPos = e.clientX;
        e.currentTarget.addEventListener("mousemove", whileDragging, true);
    }

    function checkOnMouseUp(e){
        let delay = 0;
        e.currentTarget.removeEventListener("mousemove", whileDragging, true);
        if(Math.abs(oldXPos - e.clientX) >= 100){
            if(isDragLeft){
                currentStage += 1;

                e.currentTarget.style.removeProperty("transition");

                toSlideCarouselItemHorizontally(delay);

                if(currentStage === totalItems + initStage){
                    delay = 250;

                    setTimeout(function(){
                        currentStage = initStage;
                    }, delay);

                    setTimeout(function(){
                        strengthItemContainer.style["transition"] = `transform 0s ease 0s`;
                        strengthItemContainer.style["transform"] = `translateX(${(-currentStage * movingStep)}px)`;
                    }, 500);
                }
            }
            else{
                currentStage -= 1;

                e.currentTarget.style.removeProperty("transition");

                toSlideCarouselItemHorizontally(delay);

                if(currentStage < initStage){
                    delay = 250;

                    setTimeout(function(){
                        currentStage = totalItems + 1;
                    }, delay);

                    setTimeout(function(){
                        strengthItemContainer.style["transition"] = `transform 0s ease 0s`;
                        strengthItemContainer.style["transform"] = `translateX(${(-currentStage * movingStep)}px)`;
                    }, 500);
                }
            }
            setTimeout(function(){
                toUpdateCarouselBtn();
            }, delay);
        }
        else{
            strengthItemContainer.style.removeProperty("transition");
            strengthItemContainer.style["transform"] = `translateX(${(-currentStage * movingStep)}px)`;
        }
    }

    strengthItemNextBtns.forEach(function(strengthItemNextBtn){
        strengthItemNextBtn.addEventListener("click", toMoveCarouselItemByController);
    })

    strengthItemContainer.onmousedown = toMoveCarouselByDragging;
    strengthItemContainer.onmouseup = checkOnMouseUp;

    //when changing viewport size
    window.addEventListener('resize', (event) => {
        var headerHeight = appHeaderContainer.offsetHeight;
        introSliderContainer.style.marginTop = headerHeight + 'px';
        event.stopPropagation();
        event.preventDefault();
        initCustomerFeedback();
        updateAdvantageImgSize();
        carouselUpdate();
    });
}

operation();