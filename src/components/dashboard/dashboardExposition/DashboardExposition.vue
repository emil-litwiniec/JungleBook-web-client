<template>
	<div class="dashboard-exposition">
        <h3>{{activeView}}</h3>       
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import settings, { DashboardViews } from "@/store/modules/settings";


@Component({
    name: "DashboardExposition",
})
export default class DashboardExposition extends Vue {
    dashboardViews = DashboardViews;
    get activeView() {
        return settings.dashboardViewMode;
    }
}
</script>
