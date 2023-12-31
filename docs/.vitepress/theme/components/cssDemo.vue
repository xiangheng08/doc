<template>
	<demo v-bind="$attrs">
		<!-- 处理插槽 -->
		<template v-if="$slots.left" #left>
			<slot name="left"></slot>
		</template>
		<template v-if="$slots.right" #right>
			<slot name="right"></slot>
		</template>
		<div class="container" :class="{ dark: isDark, column: columnMode }" :style="containerStyle">
			<div class="example" :class="{ 'not-height': notHeight }" :style="exampleStyle">
				<slot></slot>
			</div>
			<div class="choice" :style="choiceStyle">
				<div class="list">
					<div
						class="item"
						v-for="(item, index) in values"
						:key="index"
						:class="{ active: index === active }"
						@click="change(index)">
						<div v-if="typeof item === 'string'">
							<span class="key" v-if="property">{{ property }}</span>
							<span v-if="property">: </span>
							<span class="value">{{ item }}</span>
							<span v-if="property">;</span>
						</div>
						<template v-else>
							<div v-for="(value, key) in item" :key="key">
								<span class="key">{{ camelToKebab(key) }}</span>
								<span>: </span>
								<span class="value">{{ value }}</span>
								<span>;</span>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</demo>
</template>

<script setup lang="ts">
import type { PropType, CSSProperties } from 'vue';
import { useData } from 'vitepress';
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import { camelToKebab } from '@/utils/run'

const { isDark } = useData();

type ValueType = string | CSSProperties;

const props = defineProps({
	values: {
		type: Array as PropType<ValueType[]>,
		required: true,
	},
	property: String,
	height: String,
	default: {
		type: Number,
		default: 0,
	},
	columnModeThreshold: {
		type: Number,
		default: 580,
	},
});
const emits = defineEmits({
	change: (value: ValueType) => true,
});

// 是否为竖向模式
const columnMode = ref(false);
const containerStyle = reactive<CSSProperties>({});
const exampleStyle = reactive<CSSProperties>({});
const choiceStyle = reactive<CSSProperties>({});
const notHeight = ref(!props.height);
const innerHeight = ref(0);

if (props.height) {
	innerHeight.value = Number(props.height);
	containerStyle.height = innerHeight.value + 'px';
	exampleStyle.height = innerHeight.value + 'px';
	choiceStyle.height = innerHeight.value + 'px';
}

// 当前选择的值
const active = ref(props.default);
// 选择的值变化回调
function change(index: number) {
	active.value = index;
	emits('change', props.values[index]);
}

watch(
	columnMode,
	(val) => {
		if (val) {
			containerStyle.height = innerHeight.value * 2 + 20 + 'px';
		} else {
			containerStyle.height = innerHeight.value + 'px';
		}
	},
	{ immediate: true }
);

const onResize = () => (columnMode.value = globalThis.innerWidth < props.columnModeThreshold);
onMounted(() => globalThis.addEventListener('resize', onResize));
onUnmounted(() => globalThis.removeEventListener('resize', onResize));

onResize();
</script>

<style scoped lang="scss">
.container {
	display: flex;
	justify-content: space-between;
	--key: #e50000;
	--value: #0451a5;
	overflow: hidden;
	&.dark {
		--key: #9cdcfe;
		--value: #ce9178;
	}
	&.column {
		flex-direction: column-reverse;
		.choice {
			border-left: none;
			padding-bottom: 10px;
			margin-bottom: 10px;
			border-bottom: 1px solid var(--vp-c-divider);
			.list {
				.item {
					margin: 10px 2px;
				}
			}
		}
	}
	.example {
		flex: 1;
		overflow: auto;
		&.not-height {
			min-height: 200px;
		}
	}
	.choice {
		border-left: 1px solid var(--vp-c-divider);
		.list {
			overflow: auto;
			height: 100%;
			.item {
				padding: 8px 14px;
				border-radius: 4px;
				font-family: var(--vp-font-family-mono);
				font-size: 14px;
				cursor: pointer;
				margin: 10px;
				outline: solid 1px var(--vp-c-divider);
				.key {
					color: var(--key);
				}
				.value {
					color: var(--value);
				}
				&:hover {
					outline: solid 1px rgba(250, 149, 80, 0.6);
				}
				&.active {
					outline: solid 1.5px #fa9550;
				}
			}
		}
	}
}
</style>
