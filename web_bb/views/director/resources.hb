<div class="scenes-page grid-page">
    <div class="row">
        <div class="col-md-12 center-text">
            <h1 class="center-text"> Resources</h1>
        </div>
    </div>
    {{#grid this}}
        {{#if this}}
            <div class="well">
                <a href="javascript:void(0);" class="item-container">
                    <div class="item-preview wide-screen">
                        <div class="item-screen transparent-checkerboard"></div>
                    </div>
                    <h3 class="center-text">{{ name }}</h3>
                </a>
            </div>
        {{else}}
            <div class="well">
                <a href="javascript:void(0);" class="item-container">
                    <div class="item-preview wide-screen">
                        <div class="item-screen new"></div>
                    </div>
                    <h3 class="center-text"><span class="glyphicon glyphicon-plus"></span></h3>
                </a>
            </div>
        {{/if}}
    {{/grid}}
</div>
